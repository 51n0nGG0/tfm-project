import React from "react";

import PassedAuditsAccordionHeader from "./passed-audits-accordion-header.component";
import PassedAuditsAccordionBody from "./passed-audits-accordion-body.component";

import { useState } from "react";

import { AuditItem } from "../../types/report";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

interface PassedAuditsAccordionProps {
    passedAudits: {
        number: number;
        list: AuditItem[];
    }
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingInline: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
});


const PassedAuditsAccordion:React.FC<PassedAuditsAccordionProps> = ({passedAudits}) => {

    const styles = useStyles();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    
    return(
        <div className={styles.container}>
            <PassedAuditsAccordionHeader onToggle={() => setIsAccordionOpen(prev => !prev)} isOpen={isAccordionOpen} passedAuditsNumber={passedAudits?.number}/>
            <PassedAuditsAccordionBody isOpen={isAccordionOpen} passedAuditsList={passedAudits?.list}/>
        </div>
    );
}

export default PassedAuditsAccordion;