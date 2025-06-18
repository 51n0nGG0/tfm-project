import React from "react";

import { Image } from "@fluentui/react-image";
import { Button } from "@fluentui/react-button";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

interface AccountInfoHeaderProps {
    logout: ()=> void
}

const useStyles = makeStyles({
    container:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    icon: {
        padding: "5px " + tokens.spacingHorizontalMNudge,
    }
})

const AccountInfoHeader:React.FC<AccountInfoHeaderProps> = ({logout}) => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Image className={styles.icon}  alt="" src="/assets/icon-32.png"/>
            <Button shape="square" appearance="subtle" onClick={logout}>Cerrar sesión</Button>
        </div>
    )
}

export default AccountInfoHeader;