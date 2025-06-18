import { AppState } from '../index/App';
import { NotificationIntent } from '../index/contexts/notifications.context';

let loginDialog: Office.Dialog;
const dialogLoginUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/authorize/authorize.html';

export const signInO365 = async (
    setState: (x: AppState) => void,
    setToken: (x: string) => void,
    setAccountName: (x: string) => void,
    showNotification: (title: string, message:string, displayNotification: NotificationIntent) => void) => {

    setState({ authStatus: 'loginInProcess' });

    Office.context.ui.displayDialogAsync(
        dialogLoginUrl,
        { height: 40, width: 30},
        (result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
                showNotification(`${result.error.code}`, `${result.error.message}`, "error");
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
            showNotification("Inicio de sesión correcto", "Se ha realizado correctamente el inicio de sesión. Bienvenido " + messageFromDialog.userName + ".", "success");
        }
        else {
            loginDialog.close();
            showNotification(messageFromDialog.result.errorMessage, messageFromDialog.result.message, "error");
        }
    };

    const processLoginDialogEvent = (arg) => {
        processDialogEvent(arg, setState, showNotification);
    };
};

let logoutDialog: Office.Dialog;
const dialogLogoutUrl: string = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/logout/logout.html';

export const logoutFromO365 = async (
    setState: (x: AppState) => void,
    setToken: (x: string) => void,
    setAccountName: (x: string) => void,
    showNotification: (title: string, message:string, displayNotification: NotificationIntent) => void) => {

    Office.context.ui.displayDialogAsync(dialogLogoutUrl,
        { height: 40, width: 30 },
        async (result) => {
            if (result.status === Office.AsyncResultStatus.Failed) {
                showNotification(`${result.error.code}`, `${result.error.message}`, "error");
            }
            else {
                logoutDialog = result.value;
                logoutDialog.addEventHandler(Office.EventType.DialogMessageReceived, processLogoutMessage);
                logoutDialog.addEventHandler(Office.EventType.DialogEventReceived, processLogoutDialogEvent);
            }
        }
    );

    const processLogoutMessage = (arg: { message: string, origin: string }) => {
        if (arg.origin !== window.location.origin) {
            throw new Error("Incorrect origin passed to processLogoutMessage.");
        }

        let messageFromDialog = JSON.parse(arg.message);
        console.log(messageFromDialog);
        if (messageFromDialog.status === 'success') {
            logoutDialog.close();
            setAccountName('');
            setToken('');
            setState({
                authStatus: 'notLoggedIn',
            });
            showNotification("Cierre de sesión correcto", "Se ha realizado correctamente el cierre de sesión.", "success");
        }
        else {
            logoutDialog.close();
            showNotification(messageFromDialog.result.errorMessage, messageFromDialog.result.message, "error");
        }
    };

    const processLogoutDialogEvent = (arg) => {
        processDialogEvent(arg, setState, showNotification);
    };
};

const processDialogEvent = (arg: { error: number, type: string },
    setState: (x: AppState) => void,
    showNotification: (title: string, message:string, displayNotification: NotificationIntent) => void) => {

    switch (arg.error) {
        case 12002:
            showNotification("Redirección inválida", 'El dialogo ha sido redireccionado a una página que no existe o no se puede cargar, o la sintaxis de la URL es inválida.', "error");
            break;
        case 12003:
            showNotification("HTTPS requerido", 'El el dialogo ha sido redireccionado a una URL con protocolo HTTP.', "error");
            break;
        case 12006:
            setState({
                authStatus: 'notLoggedIn',
            });
            showNotification("Proceso interrumpido", "Se ha cerrado el dialogo de forma abrupta y se ha interrumpido el proceso en curso.", "warning")
            break;
        default:
            showNotification("Error desconocido", 'Ha ocurrido un error desconocido en el diálogo durante el proceso.', "error");
            break;
    }
};