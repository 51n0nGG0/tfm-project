import { PublicClientApplication } from '@azure/msal-browser';

let pca;
const clientId = process.env.AZURE_CLIENT_ID ?? "";

Office.onReady(async () => {
    pca = new PublicClientApplication({
        auth: {
        clientId: clientId,
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: `${window.location.origin}/login/login.html`
        },
        cache: {
        cacheLocation: 'localStorage'
        }
    });
    
    await pca.initialize();
    
    const logoutRequest = {
        postLogoutRedirectUri: `${window.location.origin}/logoutcomplete/logoutcomplete.html`,
    };
    await pca.logoutRedirect(logoutRequest);
});