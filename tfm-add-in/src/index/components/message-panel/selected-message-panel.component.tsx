import React from "react";

import AnalysisLauncher from "../analysis-launcher.component";
import MessageDetails from "../message/message-details.component";

import { getSelectedMessageId } from "../../services/outlook-client.service";

import { useEffect, useState } from "react";
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