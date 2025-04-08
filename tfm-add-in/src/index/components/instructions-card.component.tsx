import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import { Card } from "@fluentui/react-card";
import InstructionsCardBody from "./instructions-card-body.component";
import InstructionsCardHeader from "./instructions-card-header.component";

import { Instruction } from "../interfaces/instruction.interface";

const instructions:Instruction[] = [
    {
        imagePath:"assets/icon-microsoft/icon-microsoft-80.png",
        text:"1. Se solicita autorización para leer correos personales"
    },
    {
        imagePath:"assets/icon-ai/icon-ai-80.png",
        text:"2. Se analiza el correo con la ayuda de un LLM"
    },
    {
        imagePath:"assets/icon-file/icon-file-80.png",
        text:"3. Se recibe un reporte detallado del correo"
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