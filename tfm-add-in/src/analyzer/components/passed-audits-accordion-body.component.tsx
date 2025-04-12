import React from "react";

import { Accordion } from "@fluentui/react-components";
import { Collapse } from "@fluentui/react-motion-components-preview";

import PassedAuditsAccordionItem from "./passed-audits-accordion-item.component";

interface PassedAuditsAccordionBodyProps {
    isOpen: boolean,
}

const PassedAuditsAccordionBody:React.FC<PassedAuditsAccordionBodyProps> = ({isOpen}) => {
    return(
        <Collapse visible={isOpen}>
            <Accordion multiple collapsible >
                <PassedAuditsAccordionItem value={1}/>
                <PassedAuditsAccordionItem value={2}/>
            </Accordion>
        </Collapse>
    );
}

export default PassedAuditsAccordionBody;