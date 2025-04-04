import React from "react"
import { Image } from "@fluentui/react-image";
import AccountAvatar from "./avatar.component";
import "./header.component.css";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: tokens.colorNeutralBackground4,
        padding: "10px",
        borderRadius: ".5rem",
    },
    link: {
        textDecoration: "none",
        color: tokens.colorNeutralBackgroundStatic,
        ':active': {
            color: tokens.colorNeutralBackgroundStatic,
        },
        ':hover': {
            color: tokens.colorNeutralBackgroundStatic,
        }
    },
    linkContainer: {
        display: "flex",
        flexDirection: "row",
        gap: "10px",
        alignItems: "center",
    },
    h1Text: {
        fontSize: tokens.fontSizeBase500,
        fontWeight: tokens.fontWeightRegular,
        fontColor: tokens.colorNeutralBackgroundStatic,
    }
});

const Header: React.FC = () => {

    const styles = useStyles();

    return (
        <>
            <header className={styles.headerContainer}>
                <a className={"homeicon" + styles.link} href="/authorize.html">
                    <div className={styles.linkContainer}>
                        <Image width="40" height="40" src={"assets/logo-filled.png"} alt={"Home page logo"} />
                        <h1 className={styles.h1Text}>TFM Add-in</h1>
                    </div>
                </a>
                <AccountAvatar/>
            </header>
        </>
    );

}

export default Header;