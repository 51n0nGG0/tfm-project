import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

import { Button } from "@fluentui/react-button";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
    }
})

const ButtonsContainer:React.FC = () => {

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Button appearance="primary" size="large">Analizar correo</Button>
        </div>
    );
}

export default ButtonsContainer;