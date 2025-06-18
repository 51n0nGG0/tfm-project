import React from "react";

import { Card } from "@fluentui/react-card";
import { Divider } from "@fluentui/react-divider";

import AnalysisLauncher from "../analysis-launcher.component";
import FolderList from "../folder/folder-list.component";
import MailList from "../message/message-list.component";
import MessageDetails from "../message/message-details.component";

import { Message } from "@microsoft/microsoft-graph-types";

import { useState } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { useAnalysis } from "../../contexts/analysis.context";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM,
    },
    cardBody: {
        display: "grid",
        gridTemplateColumns: "auto auto 1fr",
        "@media (max-width: 700px)": {
            gridTemplateColumns: "auto",
        }, 
        columnGap: tokens.spacingHorizontalSNudge,
        rowGap: tokens.spacingHorizontalSNudge,
    },
    menuDivider: {
        height: "100%",
    }
});

const OtherMessagePanel: React.FC= () => {

    const styles = useStyles();
    
    const isMobile = useMediaQuery('(max-width: 700px)');

    const [mailListIsLoading, setMailListIsLoading] = useState<boolean>(false);
    const [folderListIsLoading, setFolderListIsLoading] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
    const [selectedMessage, setSelectedMessage] = useState<Message>(null);

    const {launchAnalysis} = useAnalysis();

    return(
        <div>
            <Card className={styles.card}>
                <div className={styles.cardBody}>
                    <FolderList 
                        selectedFolder={selectedFolder} 
                        onFolderChange={setSelectedFolder} 
                        isMobile={isMobile}
                        isLoading={folderListIsLoading}
                        setIsLoading={setFolderListIsLoading}
                    />
                    <Divider vertical={!isMobile} className={styles.menuDivider}/>
                    <MailList 
                        selectedFolder={selectedFolder} 
                        selectedMessage={selectedMessage} 
                        setSelectedMessage={setSelectedMessage} 
                        isOtherThingsLoading={folderListIsLoading}
                        isLoading={mailListIsLoading}
                        setIsLoading={setMailListIsLoading} />
                </div>
            </Card>
            {selectedMessage && 
                <Card className={styles.card}>
                    <MessageDetails messageId={selectedMessage.id}/>
                    <AnalysisLauncher onClick={()=>launchAnalysis(selectedMessage.id)} /> 
                </Card>
            }
        </div>
    );
}

export default OtherMessagePanel;