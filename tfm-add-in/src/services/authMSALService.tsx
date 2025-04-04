import { PublicClientApplication } from "@azure/msal-browser";

const clientId = process.env.AZURE_CLIENT_ID ?? "";
const redirectUri = process.env.AZURE_REDIRECT_URI ?? "";
const scope = process.env.AZURE_SCOPE ?? "";

const msalConfig = {
    auth: {
        clientId: clientId,
        authority: "https://login.microsoftonline.com/common",
        redirectUri: redirectUri,
    },
};

const msalInstance = new PublicClientApplication(msalConfig);

async function initializeMsal() {
    try {
        await msalInstance.initialize(); // Esperar inicialización
        console.log("MSAL inicializado correctamente.");
    } catch (error) {
        console.error("Error al inicializar MSAL:", error);
    }
}

export async function login() {
    
    await initializeMsal();

    try {
        const loginResponse = await msalInstance.loginPopup({
            scopes: ["User.Read", "Mail.ReadBasic", "Mail.Read"],
        });
        console.log("User:", loginResponse.account);
        return loginResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function getToken() {

    try {
        const account = msalInstance.getAllAccounts()[0];
        if (!account) throw new Error("No user logged in");

        const tokenResponse = await msalInstance.acquireTokenSilent({
            scopes: ["User.Read", "Mail.ReadBasic", "Mail.Read"],
            account: account,
        });

        return tokenResponse.accessToken;
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
}