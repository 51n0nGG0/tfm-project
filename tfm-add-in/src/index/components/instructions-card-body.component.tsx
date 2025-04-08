import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import InstructionItem from "./instruction-item.component";

import { Instruction } from "../interfaces/instruction.interface";

interface InstructionsCardBodyProps {
    instructions: Instruction[]
}

const useStyles = makeStyles({
    body: {
        display: "flex",
        flexDirection: "row",
        gap: tokens.spacingHorizontalL,
        marginLeft: tokens.spacingHorizontalM,
        marginRight: tokens.spacingHorizontalM,
    },
})

const InstructionsCardBody: React.FC<InstructionsCardBodyProps> = ({ instructions }) => {
    const styles = useStyles();

    return (
        <div className={styles.body}>
            {
                instructions.map((instruction) => 
                    <InstructionItem imagePath={instruction.imagePath} text={instruction.text}/>)
            }
        </div>
    );
}

export default InstructionsCardBody;