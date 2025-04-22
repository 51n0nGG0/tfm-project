import {  TabValue, SelectTabEvent, SelectTabData, Card, CardHeader, CardFooter, CardPreview, Title2 } from "@fluentui/react-components";
import React, {useState} from "react";
import MailTabList from "./mail-tabs-header.component";
import OtherMailTab from "./other-mail-tab.component";
import SelectedMailTab from "./selected-mail-tab.component";

const MailDetails:React.FC = () => {

    const [selectedValue, setSelectedValue] = useState<TabValue>("selectedmail");

    const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };

    return(
        <>
            <MailTabList selectedValue={selectedValue} onTabSelect={onTabSelect}/>
            {selectedValue === "selectedmail" && <SelectedMailTab/>}
            {selectedValue === "othermail" && <OtherMailTab/>}
        </>
    );
}

export default MailDetails;