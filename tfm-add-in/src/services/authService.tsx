import axios from "axios";

const clientId = process.env.AZURE_CLIENT_ID ?? "";
const tenantId = process.env.AZURE_TENANT_ID ?? "";
const redirectUri = process.env.AZURE_REDIRECT_URI ?? "";
const scope = process.env.AZURE_SCOPE ?? "";
const authUrl = process.env.AZURE_AUTH_URL ?? "";

const generateCodeVerifier = () => {
  const array = new Uint8Array(32);
  window.crypto.getRandomValues(array); // ← Usa window.crypto en lugar de importar crypto
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const generateCodeChallenge = async (verifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data); // ← Usa window.crypto aquí también
  return btoa(String.fromCharCode(...new Uint8Array(digest)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const getToken = async (code: string) => {
  const tokenEndpoint = `${authUrl}/${tenantId}/oauth2/v2.0/token`;
  const codeVerifier = localStorage.getItem("code_verifier");

  if (!codeVerifier) {
    console.error("No code_verifier found!");
    return null;
  }

  const data = new URLSearchParams({
    client_id: clientId,
    grant_type: "authorization_code",
    code: code,
    redirect_uri: redirectUri,
    scope: scope,
    code_verifier: codeVerifier,
  });

  try {
    const response = await axios.post(tokenEndpoint, data, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });
    localStorage.setItem("access_token", response.data.access_token);
    console.log("Token recibido:", response.data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al obtener el token:", error.response?.data || error.message);
    } else {
      console.error("Error inesperado:", error);
    }
    return null;
  }
};

export async function redirectToMicrosoft() {
  // Recuperar valores desde el almacenamiento local si es necesario
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);

  // Construir la URL de autenticación
  const authorizationUrl = `${authUrl}/${tenantId}/oauth2/v2.0/authorize?` +
        `client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(scope)}&response_mode=query` +
        `&code_challenge=${codeChallenge}&code_challenge_method=S256`;

  // Redirigir a la URL de Microsoft
  window.location.href = authorizationUrl;
}

export const loginWithMicrosoft = async () => {
  const dialogUrl = "https://localhost:3000/auth-dialog.html"; // O el dominio de producción

  Office.context.ui.displayDialogAsync(
    dialogUrl,
    { height: 60, width: 30, displayInIframe: false },
    (result) => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        console.error("Error al abrir el diálogo:", result.error.message);
        return;
      }

      const dialog = result.value;

      // Escuchar el mensaje de la autenticación
      dialog.addEventHandler(Office.EventType.DialogMessageReceived, (args) => {
        if ("message" in args) {
          console.log("Código de autenticación recibido:", args.message);
          dialog.close();
        }
      });

      // Manejar si el usuario cierra el diálogo
      dialog.addEventHandler(Office.EventType.DialogEventReceived, () => {
        console.log("El usuario cerró el diálogo.");
      });
    }
  );
};

export const fetchUserProfile = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const response = await axios.get("https://graph.microsoft.com/v1.0/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo perfil:", error);
    return null;
  }
};

export const listMessages = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const response = await axios.get("https://graph.microsoft.com/v1.0/me/messages", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los mensajes:", error);
    return null;
  }
};

export const getMessageText = async (id: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;

  try {
    const response = await axios.get(
      `https://graph.microsoft.com/v1.0/me/messages/${id}/?$select=subject,body,bodyPreview,uniqueBody`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Prefer: 'outlook.body-content-type="text"',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error obteniendo el mensaje:", error);
    return null;
  }
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export const logout = () => {
  localStorage.removeItem("access_token");
  window.location.href = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/logout?post_logout_redirect_uri=${encodeURIComponent(redirectUri)}`;
};
