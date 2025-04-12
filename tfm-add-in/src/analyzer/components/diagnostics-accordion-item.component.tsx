import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

import { AccordionItem, AccordionHeader, AccordionPanel } from "@fluentui/react-accordion";
import { Divider } from "@fluentui/react-divider";
import { DismissSquareFilled } from "@fluentui/react-icons";

interface DiagnosticsAccordionItemProps {
    value: number,
}

const useStyles = makeStyles({
    icon: {
        color: "red",
    },
    header:{
        ":hover": {
            backgroundColor: "grey",
        }
    }
});

const DiagnosticsAccordionItem: React.FC<DiagnosticsAccordionItemProps> = ({value}) => {

    const styles = useStyles();

    return(
        <AccordionItem value={value}>
            <AccordionHeader className={styles.header} icon={<DismissSquareFilled className={styles.icon}/>} expandIconPosition="end">
                <div>Item {value}</div>
            </AccordionHeader>
            <AccordionPanel>
                <div> Hola </div>
            </AccordionPanel>
            <Divider/>
        </AccordionItem>
    );
}

export default DiagnosticsAccordionItem;