import React from "react";

import { CounterBadge } from "@fluentui/react-badge";
import { Tab } from "@fluentui/react-tabs";
import { Tooltip } from "@fluentui/react-tooltip";

import { Folder } from "../../types/folder";

import { useMediaQuery } from "../../hooks/useMediaQuery";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

interface MailFolderItemProps {
    icon: React.JSX.Element,
    folder: Folder,
    onFolderChange: (folder: string) => void;
}

const useStyles = makeStyles({
    container: {
        "@media (min-width: 700px)": {
            width: "100%",
            gridTemplateColumns: "auto 1fr",
        },
    },
    textContainer: { 
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(0,1fr) auto",
        justifyContent: "space-between",
        justifyItems: "start",
        width: "100%",
        columnGap: tokens.spacingHorizontalSNudge,
        "@media (max-width: 700px)": {
            columnGap: "none",
        }
    },
    shrink: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        maxWidth: "100%",
        "@media (max-width: 700px)": {
            display: "none",
        },
    }
})

const FolderItem:React.FC<MailFolderItemProps> = ({icon, folder, onFolderChange}) => {

    const styles = useStyles();

    const isMobile = useMediaQuery('(max-width: 700px)');

    return (
        <Tooltip content={folder?.mailFolder?.displayName} relationship={"label"}>
            <Tab icon={icon} value={folder.id} className={styles.container} onClick={()=>onFolderChange(folder.id)}>
                {
                    isMobile ? 
                        folder?.mailFolder?.unreadItemCount != 0 && <CounterBadge appearance="filled" color="brand" count={folder?.mailFolder?.unreadItemCount}/>
                        :
                        <div className={styles.textContainer}>
                            <div className={styles.shrink}>{folder?.mailFolder?.displayName}</div>
                            <CounterBadge appearance="filled" color="brand" count={folder?.mailFolder?.unreadItemCount}/>
                        </div>
                }
            </Tab>
        </Tooltip>
    );
}

export default FolderItem;