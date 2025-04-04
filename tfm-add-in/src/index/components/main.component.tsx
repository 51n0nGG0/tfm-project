import React from "react";
import { Image } from "@fluentui/react-image";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    mainComponent: {
        display: "flex",
        flexDirection: "column",
    },
    firstContainer: {
        backgroundColor: "#183B59",
        height: "45vh",
        position: "relative",
        textAlign: "center",
    },
    secondContainer: {
        backgroundColor: "#F2F0EB",
        height: "200px",
    },
    laptopImage: {
        position: "absolute",
        bottom: "-11vh",
        width: "auto",
        height: "30vh"
    },
    primaryMessage: {
        fontSize: tokens.fontSizeHero800,
        fontWeight: tokens.fontWeightSemibold,
        lineHeight: tokens.lineHeightHero800,
        paddingInline: "30px",
        color: "#F2F0EB",
    },
    secondaryMessage: {
        fontSize: tokens.fontSizeBase400,
        fontWeight: tokens.fontWeightRegular,
        lineHeight: tokens.lineHeightBase400,
        paddingInline: "30px",
        color: "#F2F0EB",
    }
})


const LandingPage: React.FC = () => {

    const styles = useStyles();

    return (
        <>
            <main className={styles.mainComponent}>
                <div className={styles.firstContainer}>
                    <p className={styles.message + styles.primaryMessage}>Protege tu correo de amenazas en segundos</p>
                    <p className={styles.message + styles.secondaryMessage}>Escanea y detecta correos maliciosos antes de que sea demasiado tarde con ayuda de la IA</p>
                    <Image className={styles.laptopImage} width="300" height="300" src="assets/ordenador.png" alt="Laptop with an email and a warning icon"/>
                </div>
                <div className={styles.secondContainer}>
                    <div>

                    </div>
                </div>
            </main>
        </>
    );
}

export default LandingPage;