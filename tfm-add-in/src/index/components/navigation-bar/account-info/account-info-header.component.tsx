import React from "react";
import { makeStyles, Image, Button, tokens} from "@fluentui/react-components";

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

const AccountInfoHeader:React.FC = () => {
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <Image className={styles.icon}  alt="" src="/assets/icon-32.png"/>
            <Button shape="square" appearance="subtle">Cerrar sesión</Button>
        </div>
    )
}

export default AccountInfoHeader;