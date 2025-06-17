import React from "react"

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Image } from "@fluentui/react-image";

import AccountAvatar from "./account-avatar.component";

interface NavigationBarProps {
    logout: ()=> void
}

const useStyles = makeStyles({
    headerContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: tokens.colorNeutralBackground1,
        padding: tokens.spacingHorizontalMNudge,
        boxSizing: "border-box"
    },
    titleContainer: {
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

const NavigationBar: React.FC<NavigationBarProps> = ({logout}) => {

    const styles = useStyles();

    return (
        <>
            <header className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                    <Image width="40" height="40" src={"/assets/icon-64.png"} alt={"Home page logo"} />
                    <h1 className={styles.h1Text}>TFM Add-in</h1>
                </div>
                <AccountAvatar logout={logout}/>
            </header>
        </>
    );

}

export default NavigationBar;