import React from "react";

import { Avatar } from "@fluentui/react-avatar";
import { InteractionTag, InteractionTagPrimary, TagGroup } from "@fluentui/react-tags"
import { Overflow, OverflowItem } from "@fluentui/react-overflow"; 

import RecipientTagOverflowMenu from "./recipient-tag-overflow-menu.component";

import { InteractionTagPrimaryProps } from "@fluentui/react-tags";
import { Recipient } from "@microsoft/microsoft-graph-types";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface RecipientsTagGroupProps {
    recipients: Recipient[]
}

type Item = InteractionTagPrimaryProps & { value: string };

const useStyles = makeStyles({
    container: {
        overflow: "hidden",
        zIndex: 0,
        height: "fit-content",
        minWidth: "150px",
        width: "100%",
        boxSizing: "border-box",
    },
    tagGroup: {
        display: "flex",
    },
    button: {
        border: "none",
    }
});

const RecipientsTagGroup:React.FC<RecipientsTagGroupProps> = ({recipients}) => {
    
    const items:Item[] = recipients?.map((recipient)=> ({
        value: recipient.emailAddress.name.replace(" ", "_"),
        children: recipient.emailAddress.name,
        media: (
            <Avatar
                aria-hidden="true"
                name={recipient.emailAddress.name}
                color="colorful"
            />
        ),
        secondaryText: recipient.emailAddress.address,
    }));

    const styles = useStyles();
    
    return(
        <div className={styles.container}>
            <Overflow minimumVisible={1} padding={60}>
                <TagGroup className={styles.tagGroup}>
                    {
                        items?.map(({ value, ...rest })=>
                            <OverflowItem key={value} id={value!}>
                                <InteractionTag key={value}>
                                    <InteractionTagPrimary {...rest}/>
                                </InteractionTag>
                            </OverflowItem>
                        )
                    }
                    <RecipientTagOverflowMenu items={items}/>
                </TagGroup>
            </Overflow>
        </div>
    );
}

export default RecipientsTagGroup;