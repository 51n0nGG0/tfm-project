import React, { useState, useEffect } from "react";

import { List, ListItem } from "@fluentui/react-list";
import { getStandardMailFolders } from "../../../services/microsoftService";

import { MailFolder } from "@microsoft/microsoft-graph-types";
import MailFolderItem from "./mail-folder-item.component";
import { makeStyles, Subtitle2, TabList } from "@fluentui/react-components";
import { Folder } from "../../../types/folder";
import { 
    DeleteRegular, 
    DeleteFilled, 
    MailEditRegular, 
    MailEditFilled, 
    MailInboxRegular, 
    MailInboxFilled, 
    SendRegular, 
    SendFilled,
    bundleIcon
} from "@fluentui/react-icons";

import { tokens } from "@fluentui/react-components";

const Delete = bundleIcon(DeleteFilled, DeleteRegular);
const MailEdit = bundleIcon(MailEditFilled, MailEditRegular);
const MailInbox = bundleIcon(MailInboxFilled, MailInboxRegular);
const Send = bundleIcon(SendFilled, SendRegular);


const FolderIcons = {
    inbox: <MailInbox/>,
    drafts: <MailEdit/>,
    sentitems: <Send/>,
    deleteditems: <Delete/>,
}


const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    }
});

const MailFolderList:React.FC = () => {

    const styles = useStyles(); 

    const [mailFolders, setMailFolders] = useState<Folder[]>([]);

    useEffect(()=>{
        async function getMailFolders() {
            let newMailFolders = await getStandardMailFolders();
            console.log(newMailFolders)
            setMailFolders(newMailFolders);
        }

        getMailFolders();
    },[]);

    return (
        <TabList vertical>
            {mailFolders.map((mailFolder:Folder)=>{
                return (
                    <MailFolderItem icon={FolderIcons[mailFolder.id]} folder={mailFolder}/>
                );
            })}
        </TabList>
    )
}

export default MailFolderList;