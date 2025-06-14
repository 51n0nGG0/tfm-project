import { Card } from "@fluentui/react-card";
import { Divider, makeStyles, tokens } from "@fluentui/react-components";
import React, { useRef, useState } from "react";
import { Message } from "@microsoft/microsoft-graph-types";
import FolderList from "../folder/folder-list.component";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MailList from "../message/message-list.component";
import MessageDetails from "../message/message-details.component";
import AnalysisLauncher from "../analysis-launcher.component";
import { io, Socket } from "socket.io-client";
import { getMessage } from "../../../services/microsoftService";
import { useAuth } from "../../contexts/auth.context";
import { useAnalysis } from "../../contexts/analysis.context";

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