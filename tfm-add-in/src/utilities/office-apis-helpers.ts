import { AppState } from '../index/App';

let loginDialog: Office.Dialog;
const dialogLoginUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/authorize/authorize.html';

export const signInO365 = (
    setState: (x: AppState) => void,
    setToken: (x: string) => void,
    setAccountName: (x: string) => void,
    displayError: (x: string) => void) => {

    setState({ authStatus: 'loginInProcess' });

    Office.context.ui.displayDialogAsync(
        dialogLoginUrl,
        { height: 40, width: 30},
        (result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
                displayError(`${result.error.code} ${result.error.message}`);
            }
            else {
                loginDialog = result.value;
                loginDialog.addEventHandler(Office.EventType.DialogMessageReceived, processLoginMessage);
                loginDialog.addEventHandler(Office.EventType.DialogEventReceived, processLoginDialogEvent);
            }
        }
    );

    const processLoginMessage = (arg: { message: string, origin: string }) => {
        if (arg.origin !== window.location.origin) {
            throw new Error("Incorrect origin passed to processLoginMessage.");
        }

        let messageFromDialog = JSON.parse(arg.message);
        if (messageFromDialog.status === 'success') {
            loginDialog.close();
            setToken(messageFromDialog.token);
            setAccountName(messageFromDialog.userName);
            setState({
                authStatus: 'loggedIn',
            });
        }
        else {
            loginDialog.close();
            displayError(messageFromDialog.result);
        }
    };

    const processLoginDialogEvent = (arg) => {
        processDialogEvent(arg, setState, displayError);
    };
};

const processDialogEvent = (arg: { error: number, type: string },
    setState: (x: AppState) => void,
    displayError: (x: string) => void) => {

    switch (arg.error) {
        case 12002:
            displayError('The dialog box has been directed to a page that it cannot find or load, or the URL syntax is invalid.');
            break;
        case 12003:
            displayError('The dialog box has been directed to a URL with the HTTP protocol. HTTPS is required.');
            break;
        case 12006:
            setState({
                authStatus: 'notLoggedIn',
            });
            break;
        default:
            displayError('Unknown error in dialog box.');
            break;
    }
};