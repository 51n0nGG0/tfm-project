import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Avatar } from "@fluentui/react-avatar";
import { Body2, Caption1, Caption1Strong } from "@fluentui/react-text";
import { Divider } from "@fluentui/react-divider";

import { Message } from "@microsoft/microsoft-graph-types";

interface MailResumeProps {
    message: Message,
}

const useStyles = makeStyles({
    resumeContainer: {
        maxWidth: "900px",
    },
    contentContainer: {
        display: "flex",
        flexDirection: "row",
        borderLeft: "4px solid",
        borderLeftColor: tokens.colorCompoundBrandStroke,
        padding: tokens.spacingHorizontalM,
        gap: tokens.spacingHorizontalM,
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
    }
});

const MailResume: React.FC<MailResumeProps> = ({message}) => {

    console.log(message);

    const styles = useStyles();

    return(
        <div className={styles.resumeContainer}>
            <div className={styles.contentContainer}>
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