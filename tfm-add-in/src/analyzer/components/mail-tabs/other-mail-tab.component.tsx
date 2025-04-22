import { Card } from "@fluentui/react-card";
import { Button, DrawerBody, DrawerHeader, DrawerHeaderTitle, InlineDrawer, List, ListItem, makeStyles, SelectionItemId, tokens, Tooltip } from "@fluentui/react-components";
import React, { useEffect, useState } from "react";
import MailResume from "../mail/mail-resume.component";
import { getUserMessages } from "../../../services/microsoftService";
import { Message } from "@microsoft/microsoft-graph-types";
import MailFolderList from "../mail-folders/mail-folder-list.component";
import { Dismiss24Regular, NavigationRegular } from "@fluentui/react-icons";
import {
    Hamburger,
    NavCategory,
    NavCategoryItem,
    NavDrawer,
    NavDrawerBody,
    NavDrawerHeader,
    NavDrawerProps,
    NavItem,
    NavSectionHeader,
    NavSubItem,
    NavSubItemGroup,
    NavDensity,
    NavDivider,
    AppItem,
    AppItemStatic,
  } from "@fluentui/react-nav-preview";
  import {
    Label,
    Switch,
    useId,
    Radio,
    RadioGroup,
  } from "@fluentui/react-components";
  import {
    Board20Filled,
    Board20Regular,
    BoxMultiple20Filled,
    BoxMultiple20Regular,
    DataArea20Filled,
    DataArea20Regular,
    DocumentBulletListMultiple20Filled,
    DocumentBulletListMultiple20Regular,
    HeartPulse20Filled,
    HeartPulse20Regular,
    MegaphoneLoud20Filled,
    MegaphoneLoud20Regular,
    NotePin20Filled,
    NotePin20Regular,
    People20Filled,
    People20Regular,
    PeopleStar20Filled,
    PeopleStar20Regular,
    Person20Filled,
    PersonLightbulb20Filled,
    PersonLightbulb20Regular,
    Person20Regular,
    PersonSearch20Filled,
    PersonSearch20Regular,
    PreviewLink20Filled,
    PreviewLink20Regular,
    bundleIcon,
    PersonCircle24Regular,
    PersonCircle32Regular,
  } from "@fluentui/react-icons";

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "row",
    },
    list: {
        height: "400px",
        overflowY: "auto",

        '::-webkit-scrollbar': {
            width: '10px',
        },
        '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: "6px"
        },
        '::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '5px',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },

        // Firefox
        scrollbarWidth: 'thin',
        scrollbarColor: '#888 #f1f1f1',
    }
});

const OtherMailTab: React.FC = () => {

    const styles = useStyles();

    const [selectedItems, setSelectedItems] = React.useState<SelectionItemId[]>([
        "Melda Bevel",
    ]);

    const [messages, setMessages] = useState<Message[]>()
    const [isOpen, setIsOpen] = React.useState(false);

    useEffect(() => {
        async function getMessages() {  
            const newMessages = await getUserMessages();
            console.log(newMessages)
            setMessages(newMessages)
        }
        getMessages();
    },[])

    const onSelectionChange = React.useCallback(
        (
        _: React.SyntheticEvent | Event,
        data: { selectedItems: SelectionItemId[] }
        ) => {
        setSelectedItems(data.selectedItems);
        },
        []
    );

    const onFocus = React.useCallback(
        (event: React.FocusEvent<HTMLLIElement>) => {
        // Ignore bubbled up events from the children
        if (event.target !== event.currentTarget) {
            return;
        }
        setSelectedItems([event.currentTarget.dataset.value as SelectionItemId]);
        },
        []
    );

    return(
        <Card className={styles.card}>
            <NavDrawer
                open={true}
                type={"inline"}
            >
                <NavDrawerHeader>
                    <Tooltip content="Folders" relationship="label">
                        <Button size="medium" appearance="subtle" icon={<NavigationRegular/>}/>
                    </Tooltip>
                </NavDrawerHeader>
                <NavDrawerBody>
                    <AppItemStatic icon={undefined}>Folders</AppItemStatic>
                    <MailFolderList/>
                </NavDrawerBody>
            </NavDrawer>
            <List className={styles.list}>
                {
                    messages && messages.map((message)=>
                        <ListItem
                            key={message.id}
                            value={message.id}
                            data-value={message.id}
                            aria-label={message.id}
                            onFocus={onFocus}
                            checkmark={null}
                        >
                            <MailResume message={message}/>
                        </ListItem>
                    )
                }
            </List>
        </Card>
    );
}

export default OtherMailTab;