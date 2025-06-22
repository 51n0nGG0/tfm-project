import React, { useEffect, useState } from "react";

import { Label } from "@fluentui/react-label";
import { Tag } from "@fluentui/react-tags";
import { Avatar } from "@fluentui/react-avatar";
import { Input } from "@fluentui/react-input";
import { Textarea } from "@fluentui/react-textarea";

import RecipientsTagGroup from "../recipient-tag/recipient-tag-group.component";
import { Message } from "@microsoft/microsoft-graph-types";
import { getMessage } from "../../services/microsoft-api.service";

import { useAuth } from "../../contexts/auth.context";
import { useId } from "@fluentui/react-utilities";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";


interface MessageDetailsProps {
    messageId: string,
}

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM
    },
    people: {
        display: "flex",
        flexDirection: "column"
    },
    container: {
        display: "flex",
        flexDirection: "row"
    },
    tagContainer: {
        display: "flex",
        flexDirection: "column",
        padding: "5px",
        gap: "5px",
    },
    tag: {
        border: "none",
    },
    input: {
        '& input:disabled': {
            color: tokens.colorNeutralForeground1,
        }
    },
    textarea: {
        height: "200px",
        '& textarea:disabled': {
            color: tokens.colorNeutralForeground1,
        }
    }
});

const MessageDetails:React.FC<MessageDetailsProps> = ({messageId}) => {

    const styles = useStyles();

    const [message, setMessage] = useState<Message|null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const {accessToken} = useAuth();

    const subjectId = useId("subject-input");
    const contentId = useId("content-textarea");

    useEffect(()=>{
        async function fetchMessage() {
            setIsLoading(true);
            
            const result = await getMessage(messageId, accessToken);
            console.log(result);
            if (result) {
                setMessage((_prev) => result);
            }
                
            setIsLoading(false);
        }
        fetchMessage();
    },[messageId]);

    return(
        <div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">De:</Label>
                <Tag media={<Avatar name={message?.sender?.emailAddress?.name} color="colorful" aria-label={"Icono de la cuenta " + message?.sender?.emailAddress?.name}/>}
                    secondaryText={message?.sender?.emailAddress?.address}
                >
                    {message?.sender?.emailAddress?.name}
                </Tag>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Para:</Label>
                <RecipientsTagGroup recipients={message?.toRecipients}/>
            </div>
            <div className={styles.tagContainer}>
                <Label htmlFor={subjectId} weight="semibold">Asunto:</Label>
                <Input id={subjectId} className={styles.input} value={message?.subject || ''} disabled/>
            </div>
            <div className={styles.tagContainer}>
                <Label htmlFor={contentId} weight="semibold">Contenido:</Label>
                <Textarea id={contentId} className={styles.textarea} value={message?.body?.content || ''} disabled/>
            </div>
        </div>
    );
}

export default MessageDetails;