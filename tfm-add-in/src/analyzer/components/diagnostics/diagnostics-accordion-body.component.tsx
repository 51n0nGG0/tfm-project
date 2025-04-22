import React from "react";

import { Accordion } from "@fluentui/react-accordion";

import DiagnosticsAccordionItem from "./diagnostics-accordion-item.component";


const DiagnosticsAccordionBody: React.FC = () => {
    return(
        <Accordion multiple collapsible >
            <DiagnosticsAccordionItem value={1}/>
            <DiagnosticsAccordionItem value={2}/>
        </Accordion>
    );
}

export default DiagnosticsAccordionBody;