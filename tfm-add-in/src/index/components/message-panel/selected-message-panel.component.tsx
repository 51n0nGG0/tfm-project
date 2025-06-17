import React, { useEffect, useState } from "react";
import MessageDetails from "../message/message-details.component";
import { getSelectedMessageId } from "../../../services/outlookService";
import { Card } from "@fluentui/react-card";
import AnalysisLauncher from "../analysis-launcher.component";
import { useAnalysis } from "../../contexts/analysis.context";

const SelectedMessagePanel: React.FC = () => {

    const [messageId, setMessageId] = useState<string>();

    const {launchAnalysis} = useAnalysis();

    useEffect(()=>{
        async function fetchMessageId() {
            const id = await getSelectedMessageId();
            setMessageId(id);
        }
        fetchMessageId()
    },[])

    return(
        <>
            {messageId && 
            <>
                <MessageDetails messageId={messageId}/>
                <AnalysisLauncher onClick={()=>launchAnalysis(messageId)} />
            </>}
        </>
    );
}

export default SelectedMessagePanel;