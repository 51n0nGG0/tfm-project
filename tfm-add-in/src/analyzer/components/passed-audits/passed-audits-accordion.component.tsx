import React, { useState } from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import PassedAuditsAccordionHeader from "./passed-audits-accordion-header.component";
import PassedAuditsAccordionBody from "./passed-audits-accordion-body.component";


const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingInline: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
});


const PassedAuditsAccordion:React.FC = () => {

    const styles = useStyles();

    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    
    return(
        <div className={styles.container}>
            <PassedAuditsAccordionHeader onToggle={() => setIsAccordionOpen(prev => !prev)} isOpen={isAccordionOpen}/>
            <PassedAuditsAccordionBody isOpen={isAccordionOpen}/>
        </div>
    );
}

export default PassedAuditsAccordion;