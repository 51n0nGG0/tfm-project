import * as React from "react";

import { Image} from "@fluentui/react-image";
import { tokens } from "@fluentui/tokens";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface AuthorizePageHeaderProps {
    title: string;
    logo: string;
}

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    message: {
        fontSize: tokens.fontSizeHero900,
        fontWeight: tokens.fontWeightRegular,
        fontColor: tokens.colorNeutralBackgroundStatic,
    }
});

const AuthorizePageHeader: React.FC<AuthorizePageHeaderProps> = ({title, logo}) => {

    const styles = useStyles();

    return (
        <div className={styles.header}>
            <Image width="90" height="90" src={logo} alt={title} />
            <h1 className={styles.message}>{title}</h1>
        </div>
    );
};

export default AuthorizePageHeader;