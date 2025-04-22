import { MailFolder } from '@microsoft/microsoft-graph-types';
import { getToken } from './authMSALService';
import { Folder } from '../types/folder';

const STANDARD_FOLDERS = ["inbox", "drafts", "sentitems", "deleteditems"];

export async function getUserMessages() {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso.");
    return null;
  }

  try {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/mailFolders/inbox/messages?$top=10&$select=subject,sender,from,receivedDateTime,body&$orderby=receivedDateTime desc", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener correos: ${response.statusText}`);
    }

    const data = await response.json();
    return data.value;
  } catch (error) {
    console.error("Error al leer mensajes de correo:", error);
    return null;
  }
}

export async function getMailFolders() {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso.");
    return null;
  }

  try {
    const response = await fetch("https://graph.microsoft.com/v1.0/me/mailFolders", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener las carpetas de correo: ${response.statusText}`);
    }

    const data = await response.json();
    return data.value; // Lista de carpetas
  } catch (error) {
    console.error("Error al leer carpetas de correo:", error);
    return null;
  }
}

export async function getStandardMailFolders(): Promise<Folder[]> {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso.");
    return [];
  }

  const folders: Folder[] = [];

  for (const folderName of STANDARD_FOLDERS) {
    try {
      const response = await fetch(`https://graph.microsoft.com/v1.0/me/mailFolders/${folderName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.warn(`Error al obtener la carpeta '${folderName}': ${response.statusText}`);
        continue;
      }

      const data = await response.json();

      const { "@odata.context": _, ...cleanFolder } = data;

      folders.push({id: folderName, mailFolder: cleanFolder as MailFolder} as Folder);
    } catch (error) {
      console.error(`Error al obtener la carpeta '${folderName}':`, error);
    }
  }

  return folders;
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
