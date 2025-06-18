export async function isInsideOutlook(): Promise<boolean> {
    return new Promise((resolve) => {
        if (typeof Office === "undefined") {
            resolve(false);
            return;
        }

        Office.onReady((info) => {
            resolve(info.host === Office.HostType.Outlook);
        });
    });
}

export async function getSelectedMessageId(): Promise<string | null> {
    if (typeof Office === "undefined" || !Office.context.mailbox?.item) {
        console.error("No estás dentro de Outlook o no hay correo seleccionado.");
        return null;
    }

    return new Promise((resolve) => {
        const itemId = Office.context.mailbox.item.itemId;
        resolve(itemId || null);
    });
}