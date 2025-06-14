import React from "react";

import { Body1, Subtitle1 } from "@fluentui/react-text";
import { Mail48Regular } from "@fluentui/react-icons";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }    
});

const MessageListEmpty: React.FC = () => {
    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Mail48Regular />
            <Subtitle1 align="center">Carpeta vacía</Subtitle1>
            <Body1 align="center">Esta carpeta no dispone de ningún mensaje para mostrar</Body1>
        </div>
    );
}

export default MessageListEmpty;