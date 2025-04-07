import React from "react";
import { Image } from "@fluentui/react-image";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";
import { Button, Card, CardHeader, Title3, Title1, Body2, CardPreview } from "@fluentui/react-components";

const useStyles = makeStyles({
    mainComponent: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: tokens.spacingVerticalXL,        
    },
    headerComponent: {
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
    buttonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
    },
    card: {
        gap: tokens.spacingVerticalXL,
        marginInline: tokens.spacingHorizontalXL,
    },
    cardHeader: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    cardBody: {
        display: "flex",
        flexDirection: "row",
        gap: tokens.spacingHorizontalL,
        marginLeft: tokens.spacingHorizontalM,
        marginRight: tokens.spacingHorizontalM,
    },
    cardBodyItem: {
        width: "100%",
        height: "100%",
        display: "block",
    }
})


const LandingPage: React.FC = () => {

    const styles = useStyles();

    return (
        <>
            <main className={styles.mainComponent}>
                <div className={styles.headerComponent}>
                    <Title1 align="center">Protege tu correo de amenazas en segundos</Title1>
                    <Body2  align="center">Escanea y detecta correos maliciosos antes de que sea demasiado tarde con ayuda de la IA</Body2>
                    <div className={styles.buttonsContainer}>
                        <Button appearance="primary" size="large" className={styles.primaryButton}>Analizar un correo ahora</Button>
                    </div>
                </div>
                <Card size="medium" className={styles.card}>
                    <CardHeader className={styles.cardHeader}
                        header={
                            <Title3 align="center">Cómo funciona el analizador</Title3>
                        }/>
                    <div className={styles.cardBody}>
                        <div className={styles.cardBodyItem}>
                            <Image width="70" height="70" src="assets/icon-microsoft-500.png"/>
                            <p>1. Se solicita autorización para leer correos personales</p>
                        </div>
                        <div className={styles.cardBodyItem}>
                            <Image width="70" height="70" src="assets/icon-ai-500.png"/>
                            <p>2. Se analiza el correo con la ayuda de un LLM</p>
                        </div>
                        <div className={styles.cardBodyItem}>
                            <Image width="70" height="70" src="assets/icon-file-500.png"/>
                            <p>3. Se recibe un reporte detallado del correo</p>
                        </div>
                    </div>
                </Card>
            </main>
        </>
    );
}

export default LandingPage;