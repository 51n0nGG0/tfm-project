import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Label } from "@fluentui/react-label";
import { Tag } from "@fluentui/react-tags";
import { Avatar } from "@fluentui/react-avatar";
import { Input } from "@fluentui/react-input";
import { Textarea } from "@fluentui/react-textarea";

import RecipientsTagGroup from "../recipient-tag/recipient-tag-group.component";
import { Message } from "@microsoft/microsoft-graph-types";

interface MailDetailsProps {
    mail: Message,
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
        '& textarea:disabled': {
            color: tokens.colorNeutralForeground1,
        }
    }
});

const MailDetails:React.FC<MailDetailsProps> = ({mail}) => {

    const styles = useStyles();

    return(
        <div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">De:</Label>
                <Tag media={<Avatar name={mail.sender.emailAddress.name} color="colorful"/>}
                    secondaryText={mail.sender.emailAddress.address}
                >
                    {mail.sender.emailAddress.name}
                </Tag>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Para:</Label>
                <RecipientsTagGroup recipients={mail.toRecipients}/>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Asunto:</Label>
                <Input className={styles.input} value={mail.subject} disabled/>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Contenido:</Label>
                <Textarea className={styles.textarea} value={mail.body.content} disabled/>
            </div>
        </div>
    );
}

export default MailDetails;