import { MailFolder } from '@microsoft/microsoft-graph-types';
import { getToken } from './authMSALService';
import { Folder } from '../types/folder';

const STANDARD_FOLDERS = ["inbox", "drafts", "sentitems", "deleteditems"];

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

export async function getFolderMessages(folder: string, nextLink?: string) {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso.");
    return null;
  }

  try {
    const url = nextLink
      ? nextLink
      : `https://graph.microsoft.com/v1.0/me/mailFolders/${folder}/messages?$top=20&$select=subject,sender,from,receivedDateTime,bodyPreview,isRead&$orderby=receivedDateTime desc`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener correos: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data)
    return {
      messages: data.value,
      nextLink: data["@odata.nextLink"] || null,
    };
  } catch (error) {
    console.error("Error al leer mensajes de correo:", error);
    return null;
  }
}

export async function getMessage(id: string) {
  const accessToken = await getToken();
  if (!accessToken) {
    console.error("No se pudo obtener el token de acceso.");
    return null;
  }

  try {
    const url = `https://graph.microsoft.com/v1.0/me/messages/${id}?$select=subject,sender,from,receivedDateTime,bodyPreview,body,toRecipients,ccRecipients,isRead`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "Prefer": 'outlook.body-content-type="text"',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el mensaje: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error al leer el mensaje:", error);
    return null;
  }
}

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
