import React from "react";

import { Skeleton, SkeletonItem } from "@fluentui/react-skeleton";
import { TabList } from "@fluentui/react-tabs";
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

import FolderItem from "./folder-item.component";

import { Folder } from "../../types/folder";

import { useState, useEffect } from "react"; 
import { useAuth } from "../../contexts/auth.context";

import { getStandardMailFolders } from "../../services/microsoft-api.service";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

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

    const {accessToken} = useAuth();

    useEffect(()=>{
        async function getMailFolders() {
            setIsLoading(true);
            
            let newMailFolders = await getStandardMailFolders(accessToken);
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