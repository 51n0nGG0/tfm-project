import React from "react";

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel, AccordionToggleEventHandler, Body2, Caption1, Divider, makeStyles, tokens } from "@fluentui/react-components";
import { DismissSquareFilled} from "@fluentui/react-icons";

const useStyles = makeStyles({
    container: {
        minWidth:"350px",
        maxWidth:"800px",
        width: "100%",
        paddingInline: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
    icon: {
        color: "red",
    },
    title: {
        lineHeight: "44px",
    },
    acordionItem:{
        ":hover": {
            backgroundColor: "grey",
        }
    }
});

const DiagnosticsAccordion: React.FC = () => {

    const styles = useStyles();

    return (
        <div className={styles.container}>
        <Body2 className={styles.title}>DIAGNÓSTICO</Body2>
        <Accordion
            multiple
            collapsible
        >
            <Divider/>
            <AccordionItem value="1">
                <AccordionHeader className={styles.acordionItem} icon={<DismissSquareFilled className={styles.icon}/>} expandIconPosition="end">
                    <div>Item 1</div>
                </AccordionHeader>
                <AccordionPanel>
                    <div> Hola </div>
                </AccordionPanel>
            </AccordionItem>
            <Divider/>
            <AccordionItem value="2">
                <AccordionHeader icon={<DismissSquareFilled className={styles.icon}/>} expandIconPosition="end">
                    <div>Item 2</div>
                </AccordionHeader>
                <AccordionPanel>

                </AccordionPanel>
            </AccordionItem>
            <Divider/>
        </Accordion>
        <div>
            <Body2>AUDITORIAS PASADAS(20)</Body2>
            <Caption1>Show</Caption1> 
        </div>
        </div>
    );
}

export default DiagnosticsAccordion