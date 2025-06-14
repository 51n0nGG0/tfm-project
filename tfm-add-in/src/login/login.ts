import { PublicClientApplication } from "@azure/msal-browser";

const clientId = process.env.AZURE_CLIENT_ID ?? "";

Office.onReady(async () => {
    const pca = new PublicClientApplication({
        auth: {
            clientId: clientId,
            authority: 'https://login.microsoftonline.com/common',
            redirectUri: `${window.location.origin}/login/login.html` // Must be registered as "spa" type.
        },
        cache: {
            cacheLocation: 'localStorage' // Needed to avoid a "login required" error.
        }
    });
    await pca.initialize();

    try {
        // handleRedirectPromise should be invoked on every page load.
        const response = await pca.handleRedirectPromise();
        if (response) {
            Office.context.ui.messageParent(JSON.stringify({ status: 'success', token: response.accessToken, userName: response.account.username}));
        } else {
            // A problem occurred, so invoke login.
            await pca.loginRedirect({
                scopes: ["User.Read", "Mail.ReadBasic", "Mail.Read"]
            });
        }
    } catch (error) {
        const errorData = {
            errorMessage: error.errorCode,
            message: error.errorMessage,
            errorCode: error.stack
        };
        Office.context.ui.messageParent(JSON.stringify({ status: 'failure', result: errorData }));
    }
});