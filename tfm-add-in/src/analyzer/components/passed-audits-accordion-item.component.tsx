import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

import { AccordionItem, AccordionHeader, AccordionPanel } from "@fluentui/react-accordion";
import { Divider } from "@fluentui/react-divider";
import { CheckmarkCircleFilled } from "@fluentui/react-icons";

interface PassedAuditsAccordionItemProps {
    value: number
}

const useStyles = makeStyles({
    icon: {
        color: "green",
    },
    header:{
        ":hover": {
            backgroundColor: "grey",
        }
    }
});

const PassedAuditsAccordionItem: React.FC<PassedAuditsAccordionItemProps> = ({value}) => {

    const styles = useStyles();

    return(
        <AccordionItem value={value}>
            <AccordionHeader className={styles.header} icon={<CheckmarkCircleFilled className={styles.icon}/>} expandIconPosition="end">
                <div>Item {value}</div>
            </AccordionHeader>
            <AccordionPanel>
                <div> Hola </div>
            </AccordionPanel>
            <Divider/>
        </AccordionItem>
    );
}

export default PassedAuditsAccordionItem;