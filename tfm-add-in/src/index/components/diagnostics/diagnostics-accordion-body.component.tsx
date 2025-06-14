import React from "react";

import { Accordion } from "@fluentui/react-accordion";

import DiagnosticsAccordionItem from "./diagnostics-accordion-item.component";
import { DiagnosticItem } from "../../types/report";

interface DiagnosticsAccordionBodyProps {
    diagnosticsList: DiagnosticItem[]
}

const DiagnosticsAccordionBody: React.FC<DiagnosticsAccordionBodyProps> = ({diagnosticsList}) => {
    return(
        <Accordion multiple collapsible >
            { diagnosticsList?.map((diagnostic:DiagnosticItem, index:number) => <DiagnosticsAccordionItem value={index} name={diagnostic.name} description={diagnostic.shortDescription}/>)}
        </Accordion>
    );
}

export default DiagnosticsAccordionBody;