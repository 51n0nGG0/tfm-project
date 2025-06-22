import React from "react";

import InstructionItem from "./instruction-item.component";

import { Instruction } from "../../../interfaces/instruction.interface";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

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
                    <InstructionItem instruction={instruction}/>)
            }
        </div>
    );
}

export default InstructionsCardBody;