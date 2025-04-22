import React from "react";

import {TabList, Tab, TabValue, SelectTabEvent, SelectTabData} from "@fluentui/react-tabs";

interface MailTabListProps {
    selectedValue: TabValue,
    onTabSelect: (event: SelectTabEvent, data: SelectTabData) => void
}

const MailTabList:React.FC<MailTabListProps> = ({selectedValue, onTabSelect}) => {
    return(
        <TabList 
            selectedValue={selectedValue} 
            onTabSelect={onTabSelect}
            size="large"
        >
            <Tab id="SelectedMail" value="selectedmail">
                Selected Mail
            </Tab>
            <Tab id="OtherMail" value="othermail">
                Other Mail
            </Tab>
        </TabList>
    );
}

export default MailTabList;