import React from "react";

import MessageTabList from "./message-tab/message-tab-list.component";
import OtherMessagePanel from "./message-panel/other-message-panel.component";
import SelectedMessagePanel from "./message-panel/selected-message-panel.component";

import { isInsideOutlook } from "../services/outlook-client.service";

import { TabValue, SelectTabEvent, SelectTabData } from "@fluentui/react-tabs";

import {useEffect, useState} from "react";

type TabItem = {
    id: string;
    name: string;
    panel: React.ReactNode;
    showCondition?: () => Promise<boolean> | boolean;
};

const allTabs:TabItem[] = [
    {
        id: "selectedmessage",
        name: "Selected Message",
        panel: <SelectedMessagePanel/>,
        showCondition: isInsideOutlook
    },
    {
        id: "othermessages",
        name: "Other Messages",
        panel: <OtherMessagePanel/>
    }
]

async function filterTabs(tabs: TabItem[]): Promise<TabItem[]> {
    const results = await Promise.all(
        tabs.map(async (tab) => {
            if (!tab.showCondition) return true;
            const result = await tab.showCondition();
            return result;
        })
    );
    return tabs.filter((_tab, index) => results[index]);
}

const MessagesCard:React.FC = () => {

    const [selectedValue, setSelectedValue] = useState<TabValue>("othermail");
    const [tabs, setTabs] = useState<TabItem[]>([]);

    const onTabSelect = (_event: SelectTabEvent, data: SelectTabData) => {
        setSelectedValue(data.value);
    };

    useEffect(() => {
        async function setupTabs() {
            const visibleTabs = await filterTabs(allTabs);
            setTabs(visibleTabs);

            if (!visibleTabs.find((tab) => tab.id === selectedValue)) {
                setSelectedValue(visibleTabs[0]?.id);
            }
        }

        setupTabs();
    }, []);

    const currentPanel = tabs.find((tab) => tab.id === selectedValue)?.panel;

    return (
        <>
        <MessageTabList selectedValue={selectedValue} onTabSelect={onTabSelect} tabs={tabs}/>
        {currentPanel}
        </>
    );
};

export default MessagesCard;