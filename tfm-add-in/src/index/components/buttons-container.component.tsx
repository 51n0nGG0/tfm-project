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

    const handleClick = async () => {
        window.location.href = "/authorize.html"
    }

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Button onClick={handleClick} appearance="primary" size="large">Analizar un correo ahora</Button>
        </div>
    );
}

export default ButtonsContainer;