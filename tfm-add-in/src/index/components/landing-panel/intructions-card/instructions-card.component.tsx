import React from "react";

import { Card } from "@fluentui/react-card";

import InstructionsCardBody from "./instructions-card-body.component";
import InstructionsCardHeader from "./instructions-card-header.component";

import { Instruction } from "../../../interfaces/instruction.interface";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const instructions:Instruction[] = [
    {
        imagePath:"assets/icon-microsoft/icon-microsoft-80.png",
        text:"1. Se solicita autorización para leer correos personales",
        alt:"Icono de Microsoft 365 en color negro."
    },
    {
        imagePath:"assets/icon-ai/icon-ai-80.png",
        text:"2. Se analiza el correo con la ayuda de un LLM",
        alt:"Icono de procesador en color negro con las letras IA en el centro."
    },
    {
        imagePath:"assets/icon-file/icon-file-80.png",
        text:"3. Se recibe un reporte detallado del correo",
        alt:"Icono de archivo representando un informe en color negro"
    }
]

const useStyles = makeStyles({
    card: {
        gap: tokens.spacingVerticalXL,
        marginInline: tokens.spacingHorizontalXL,
    }
})

const InstructionsCard: React.FC = () => {
    const styles = useStyles();

    return (
        <Card size="medium" className={styles.card}>
            <InstructionsCardHeader title="Cómo funciona el analizador"/>
            <InstructionsCardBody instructions={ instructions }/>
        </Card>
    );
}

export default InstructionsCard;