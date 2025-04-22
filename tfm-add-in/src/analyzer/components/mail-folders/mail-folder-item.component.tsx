import React from "react";

import { Body1 } from "@fluentui/react-text";
import { Button, CounterBadge, makeStyles, Tab } from "@fluentui/react-components";
import { Folder } from "../../../types/folder";
import { FluentIcon } from "@fluentui/react-icons";

interface MailFolderItemProps {
    icon: React.JSX.Element,
    folder: Folder,
}

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    }
})

const MailFolderItem:React.FC<MailFolderItemProps> = ({icon, folder}) => {
    const styles = useStyles();

    return (
        <Tab icon={icon} value={folder?.mailFolder?.displayName}>
            {folder?.mailFolder?.displayName}
            <CounterBadge appearance="filled" color="brand" count={folder?.mailFolder?.unreadItemCount}/>
        </Tab>
    );
}

export default MailFolderItem;