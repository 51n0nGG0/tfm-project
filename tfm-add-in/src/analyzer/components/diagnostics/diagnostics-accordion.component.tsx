import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import DiagnosticsAccordionHeader from "./diagnostics-accordion-header.component";
import DiagnosticsAccordionBody from "./diagnostics-accordion-body.component";


const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingInline: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
});

const DiagnosticsAccordion: React.FC = () => {

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <DiagnosticsAccordionHeader/>
            <DiagnosticsAccordionBody/>
        </div>
    );
}

export default DiagnosticsAccordion