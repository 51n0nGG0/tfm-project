import React from "react";

import { Accordion } from "@fluentui/react-components";
import { Collapse } from "@fluentui/react-motion-components-preview";

import PassedAuditsAccordionItem from "./passed-audits-accordion-item.component";
import { AuditItem } from "../../types/report";

interface PassedAuditsAccordionBodyProps {
    isOpen: boolean,
    passedAuditsList:AuditItem[]
}

const PassedAuditsAccordionBody:React.FC<PassedAuditsAccordionBodyProps> = ({isOpen, passedAuditsList}) => {
    return(
        <Collapse visible={isOpen}>
            <Accordion multiple collapsible >
                { passedAuditsList?.map((passedAudit:AuditItem, index:number)=><PassedAuditsAccordionItem value={index} name={passedAudit.name} description={passedAudit.shortDescription}/>) }
            </Accordion>
        </Collapse>
    );
}

export default PassedAuditsAccordionBody;