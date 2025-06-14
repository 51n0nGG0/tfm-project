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

interface ButtonsContainerProps {
    action: ()=>void
}

const ButtonsContainer:React.FC<ButtonsContainerProps> = ({action}) => {

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Button onClick={action} appearance="primary" size="large">Analizar un correo ahora</Button>
        </div>
    );
}

export default ButtonsContainer;