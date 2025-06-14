import React, { useEffect, useState } from "react";
import MessageDetails from "../message/message-details.component";
import { getSelectedMessageId } from "../../../services/outlookService";

const SelectedMessagePanel: React.FC = () => {

    const [messageId, setMessageId] = useState<string>();

    useEffect(()=>{
        async function fetchMessageId() {
            const id = await getSelectedMessageId();
            setMessageId(id);
        }
        fetchMessageId()
    },[])

    return(
        <>
            {messageId && <MessageDetails messageId={messageId}/>}
        </>
    );
}

export default SelectedMessagePanel;