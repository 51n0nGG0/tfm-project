import { Card } from "@fluentui/react-card";
import { Button, Divider, makeStyles, ProgressBar, Skeleton, SkeletonItem, Spinner, tokens } from "@fluentui/react-components";
import React, { useEffect, useRef, useState } from "react";
import MailResume from "../message/message-resume.component";
import { getFolderMessages } from "../../../services/microsoftService";
import { Message } from "@microsoft/microsoft-graph-types";
import FolderList from "../folder/folder-list.component";
import {useStaticVirtualizerMeasure, Virtualizer} from "@fluentui/react-virtualizer"
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import MailList from "../message/message-list.component";
import MessageDetails from "../message/message-details.component";
import AnalysisLauncher from "../analysis-launcher.component";

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

const OtherMessagePanel: React.FC = () => {

    const styles = useStyles();
    
    const isMobile = useMediaQuery('(max-width: 700px)');

    const [mailListIsLoading, setMailListIsLoading] = useState<boolean>(false);
    const [folderListIsLoading, setFolderListIsLoading] = useState<boolean>(false);

    const [selectedFolder, setSelectedFolder] = useState<string>("inbox");
    const [selectedMessage, setSelectedMessage] = useState<Message>(null);

    function launchAnalysis () {
        //Establecemos analisis a EN CURSO
        //Lanzamos el analisis con el mensaje actual
        //Restablecemos analisis a FINALIZADO
    }

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
                    <AnalysisLauncher onClick={launchAnalysis} /> 
                </Card>
            }
        </div>
    );
}

export default OtherMessagePanel;