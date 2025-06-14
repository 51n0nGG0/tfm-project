import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Title1, Body2 } from "@fluentui/react-text";
import ButtonsContainer from "./buttons-container.component";

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: tokens.spacingVerticalXL,
        background: "linear-gradient(90deg, #92ACDC, #FFFFFF)",
        paddingBlock: tokens.spacingVerticalXXL,
        paddingInline: tokens.spacingHorizontalXL,
        width: "100%",
        boxSizing: "border-box"
    },
})

interface LandingPageHeaderProps {
    login: ()=>void
}

const LandingPageHeader: React.FC<LandingPageHeaderProps> = ({login}) => {

    const styles = useStyles();

    return (
        <div className={styles.header}>
            <Title1 align="center">Protege tu correo de amenazas en segundos</Title1>
            <Body2  align="center">Escanea y detecta correos maliciosos antes de que sea demasiado tarde con ayuda de la IA</Body2>
            <ButtonsContainer action={login}/>
        </div>
    );
}

export default LandingPageHeader;