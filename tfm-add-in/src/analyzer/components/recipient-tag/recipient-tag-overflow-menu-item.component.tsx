import React from "react"

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";
import { shorthands } from "@griffel/react/index.cjs";
import { tagClassNames } from "@fluentui/react-tags";

import { MenuItem } from "@fluentui/react-menu";
import { Tag } from "@fluentui/react-tags";

import { TagProps } from "@fluentui/react-components";

import { useIsOverflowItemVisible } from "@fluentui/react-overflow";

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
