import React from "react";

import DiagnosticsAccordionHeader from "./diagnostics-accordion-header.component";
import DiagnosticsAccordionBody from "./diagnostics-accordion-body.component";

import { DiagnosticItem } from "../../types/report";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

interface DiagnosticsAccordionProps {
    diagnostics: {
        number: number;
        list: DiagnosticItem[];
    }
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        paddingInline: tokens.spacingHorizontalM,
        boxSizing: "border-box",
    },
});

const DiagnosticsAccordion: React.FC<DiagnosticsAccordionProps> = ({diagnostics}) => {

    const styles = useStyles();

    return (
        <div className={styles.container}>
            <DiagnosticsAccordionHeader diagnosticsNumber={diagnostics?.number}/>
            <DiagnosticsAccordionBody diagnosticsList={diagnostics?.list}/>
        </div>
    );
}

export default DiagnosticsAccordion