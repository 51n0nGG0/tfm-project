import { Card } from "@fluentui/react-card";
import { Body1, makeStyles, Persona, Divider, Tag, Avatar, Body1Strong, Textarea, Label, Input, tokens } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import { getMockMessage } from "../../utils/mock.service";
import { Message } from "@microsoft/microsoft-graph-types";
import RecipientsTagGroup from "../recipient-tag/recipient-tag-group.component";

const mails = [
    {
        emailAddress: {
            name: "prueba1",
            address: "prueba1@outlook.es"
        }
    },
    {
        emailAddress: {
            name: "prueba2",
            address: "prueba2@outlook.es"
        }
    },
    {
        emailAddress: {
            name: "prueba3",
            address: "prueba3@outlook.es"
        }  
    }
]

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

const SelectedMailTab: React.FC = () => {

    const itemId = Office.context.mailbox?.item.itemId;

    console.log(itemId);

    const styles = useStyles();

    const [message, setMessage] = useState<Message>();

    useEffect(()=> {
        async function onLoad() {
            const newMessage = await getMockMessage();
            setMessage(newMessage);
            console.log(sessionStorage.getItem("accessToken"))
        }
        onLoad();
    }, [])

    return(
        <Card className={styles.card}>
            <div className={styles.tagContainer}>
                <Label weight="semibold">De:</Label>
                <Tag media={<Avatar name="Mock Test" color="colorful"/>}
                    secondaryText={"mocktest@outlook.es"}
                >
                    Mock Test
                </Tag>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Para:</Label>
                <RecipientsTagGroup recipients={mails}/>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Asunto:</Label>
                <Input className={styles.input} value="Asunto del mensaje" disabled/>
            </div>
            <div className={styles.tagContainer}>
                <Label weight="semibold">Contenido:</Label>
                <Textarea className={styles.textarea} value="Contenido del mensaje de mock" disabled/>
            </div>
        </Card>
    );
}

export default SelectedMailTab;