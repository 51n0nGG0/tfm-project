import React from "react";

import { AccordionItem, AccordionHeader, AccordionPanel } from "@fluentui/react-accordion";
import { Divider } from "@fluentui/react-divider";
import { DismissSquareFilled } from "@fluentui/react-icons";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface DiagnosticsAccordionItemProps {
    value: number,
    name: string,
    description: string,
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

const DiagnosticsAccordionItem: React.FC<DiagnosticsAccordionItemProps> = ({value, name, description}) => {

    const styles = useStyles();

    return(
        <AccordionItem value={value}>
            <AccordionHeader className={styles.header} icon={<DismissSquareFilled className={styles.icon}/>} expandIconPosition="end">
                <div>{name}</div>
            </AccordionHeader>
            <AccordionPanel>
                <div>{description}</div>
            </AccordionPanel>
            <Divider/>
        </AccordionItem>
    );
}

export default DiagnosticsAccordionItem;