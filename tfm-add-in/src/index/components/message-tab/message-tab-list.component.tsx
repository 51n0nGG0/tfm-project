import React, { useEffect, useState } from "react";

import {TabList, Tab, TabValue, SelectTabEvent, SelectTabData} from "@fluentui/react-tabs";

import { isInsideOutlook } from "../../../services/outlookService";

interface MailTabListProps {
    selectedValue: TabValue,
    onTabSelect: (event: SelectTabEvent, data: SelectTabData) => void,
    tabs: {id: string, name: string}[]
}

const MessageTabList:React.FC<MailTabListProps> = ({selectedValue, onTabSelect, tabs}) => {

    return(
        <TabList 
            selectedValue={selectedValue} 
            onTabSelect={onTabSelect}
            size="large"
        >
            {tabs.map((tab) => (
                <Tab key={tab.id} value={tab.id}>
                    {tab.name}
                </Tab>
            ))}
        </TabList>
    );
}

export default MessageTabList;