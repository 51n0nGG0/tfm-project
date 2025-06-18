import React from "react"

import { MenuItem } from "@fluentui/react-menu";
import { Tag } from "@fluentui/react-tags";

import { TagProps, tagClassNames } from "@fluentui/react-tags";

import { useIsOverflowItemVisible } from "@fluentui/react-overflow";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { shorthands } from "@griffel/react/index.cjs";
import { tokens } from "@fluentui/tokens";

interface RecipientTagOverflowMenuItemProps {
    tag: TagProps,
}

const useStyles = makeStyles({
    menuItem: {
        padding: `${tokens.spacingVerticalSNudge} ${tokens.spacingHorizontalXS}`,
        ":hover": {
          [`& .${tagClassNames.root}`]: {
            color: tokens.colorNeutralForeground2Hover,
          },
        },
      },
      tag: {
        backgroundColor: "transparent",
        ...shorthands.borderColor("transparent"),
      },
});

const RecipientTagOverflowMenuItem: React.FC<RecipientTagOverflowMenuItemProps> = ({tag}) => {

    const styles = useStyles();

    const isVisible = useIsOverflowItemVisible(tag.value);

    if(isVisible) {
        return null;
    }

    return(
        <MenuItem key={tag.value} className={styles.menuItem}>
            <Tag {...tag} as="span" className={styles.tag}/>
        </MenuItem>
    );
}

export default RecipientTagOverflowMenuItem;
