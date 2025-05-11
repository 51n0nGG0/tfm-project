import React, { useState, useEffect } from "react";

import { List, ListItem } from "@fluentui/react-list";
import { getStandardMailFolders } from "../../../services/microsoftService";

import { MailFolder } from "@microsoft/microsoft-graph-types";
import FolderItem from "./folder-item.component";
import { makeStyles, Skeleton, SkeletonItem, Subtitle2, TabList } from "@fluentui/react-components";
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

const Delete = bundleIcon(DeleteFilled, DeleteRegular);
const MailEdit = bundleIcon(MailEditFilled, MailEditRegular);
const MailInbox = bundleIcon(MailInboxFilled, MailInboxRegular);
const Send = bundleIcon(SendFilled, SendRegular);

interface MailFolderListProps {
    selectedFolder: string,
    onFolderChange: (folder: string) => void,
    isMobile: boolean,
    isLoading: boolean,
    setIsLoading: (isLoading:boolean) => void,
}

const FolderIcons = {
    inbox: <MailInbox/>,
    drafts: <MailEdit/>,
    sentitems: <Send/>,
    deleteditems: <Delete/>,
}


const useStyles = makeStyles({
    container: {
        width:"225px",
        "@media (max-width: 700px)": {
            width: "unset",
            justifyContent: "space-between",
        }, 
    },
    skeleton: {
        width: "225px",
        height: "100%",
        "@media (max-width: 700px)": {
            width: "100%",
            height: "56px",
        },
    }
});

const FolderList:React.FC<MailFolderListProps> = ({selectedFolder,onFolderChange, isMobile, isLoading, setIsLoading}) => {

    const styles = useStyles();

    const [mailFolders, setMailFolders] = useState<Folder[]>([]);

    useEffect(()=>{
        async function getMailFolders() {
            setIsLoading(true);
            
            let newMailFolders = await getStandardMailFolders();
            console.log(newMailFolders)
            setMailFolders(newMailFolders);
            
            setIsLoading(false);
        }
        getMailFolders();
    },[]);

    return (
        <>
            { isLoading ?
                <Skeleton>
                    <SkeletonItem className={styles.skeleton}/>
                </Skeleton>
                :
                <TabList selectedValue={selectedFolder} vertical={!isMobile} className={styles.container} size="large">
                    {mailFolders.map((mailFolder:Folder)=>{
                        return (
                            <FolderItem icon={FolderIcons[mailFolder.id]} folder={mailFolder} onFolderChange={onFolderChange}/>
                        );
                    })}
                </TabList>
            }
        </>
        
    )
}

export default FolderList;