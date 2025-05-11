import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Avatar } from "@fluentui/react-avatar";
import { Body2, Caption1, Caption1Strong } from "@fluentui/react-text";
import { Divider } from "@fluentui/react-divider";

import { Message } from "@microsoft/microsoft-graph-types";
import { mergeClasses } from "@fluentui/react-components";
import SelectedMessagePanel from "../message-panel/selected-message-panel.component";

interface MailResumeProps {
    message: Message,
    selectedMessage: Message,
    onSelectMessage: (message:Message) => void,
}

const useStyles = makeStyles({
    resumeContainer: {
        
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        borderLeft: "4px solid",
        padding: tokens.spacingHorizontalM,
        gap: tokens.spacingHorizontalM,
    },
    read: {
        borderLeftColor: tokens.colorNeutralForegroundDisabled,
    },
    notRead: {
        borderLeftColor: tokens.colorCompoundBrandStroke,
    },
    textContainer: {
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
    },
    avatar: {
        alignSelf: "center",
    },
    text: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    selected: {
        backgroundColor: tokens.colorNeutralBackground3Pressed,
    }
});

const MailResume: React.FC<MailResumeProps> = ({message, selectedMessage, onSelectMessage}) => {
    const styles = useStyles();

    const read = mergeClasses(styles.contentContainer, styles.read);
    const notRead = mergeClasses(styles.contentContainer, styles.notRead);

    const selected = mergeClasses(styles.resumeContainer, styles.selected);

    return(
        <div className={selectedMessage?.id === message?.id ? selected : styles.resumeContainer } onClick={()=>onSelectMessage(message)}>
            <div className={message.isRead ? read : notRead}>
                <Avatar className={styles.avatar} size={48} shape="square" name={message.sender.emailAddress.name} color="colorful"/>
                <div className={styles.textContainer}>
                    <Body2 className={styles.text}>{message.sender?.emailAddress.name + "<" + message.sender?.emailAddress.address + ">"}</Body2>
                    <Caption1Strong className={styles.text}>{message.subject}</Caption1Strong>
                    <Caption1 className={styles.text}>{message.bodyPreview}</Caption1>
                </div>
            </div>
            <Divider/>
        </div>
    );
}

export default MailResume;