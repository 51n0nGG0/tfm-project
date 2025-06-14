import React from "react";

import { InteractionTag, InteractionTagPrimary, Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, useOverflowMenu } from "@fluentui/react-components";

import RecipientTagOverflowMenuItem from "./recipient-tag-overflow-menu-item.component";

import { Item } from "../../types/item";

interface RecipientTagOverflowMenuProps {
    items: Item[]
}

const RecipientTagOverflowMenu: React.FC<RecipientTagOverflowMenuProps> = ({items}) => {

    const {ref, isOverflowing, overflowCount} = 
        useOverflowMenu<HTMLButtonElement>();

    if(!isOverflowing){
        return null;
    }

    return(
        <InteractionTag>
            <Menu>
                <MenuTrigger disableButtonEnhancement>
                    <InteractionTagPrimary
                        ref={ref}
                        aria-label={`${overflowCount} more tags`}
                    >
                        {`+${overflowCount}`}
                    </InteractionTagPrimary>
                </MenuTrigger>
                <MenuPopover>
                    <MenuList>
                        {items.map((item)=>
                         <RecipientTagOverflowMenuItem key={item.value} tag={item}/>)
                        }
                    </MenuList>
                </MenuPopover>
            </Menu>
        </InteractionTag>
    );
}

export default RecipientTagOverflowMenu;