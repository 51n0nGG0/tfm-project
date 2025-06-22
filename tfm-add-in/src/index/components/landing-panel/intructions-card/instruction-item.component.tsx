import React from "react";

import { Image } from "@fluentui/react-image";

import { Instruction } from "../../../interfaces/instruction.interface";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface LandingPageCardBodyItemProps {
    instruction: Instruction;
}

const useStyles = makeStyles({
    item: {
        width: "100%",
        height: "100%",
        display: "block",
    },
    image: {
        width: "70px",
        height: "70px",
    }
})

const InstructionItem: React.FC<LandingPageCardBodyItemProps> = ({instruction}) => {
    const styles = useStyles();

    return (
        <div className={styles.item}>
            <Image className={styles.image} src={instruction.imagePath} alt={instruction.alt}/>
            <p>{instruction.text}</p>
        </div>
    );
}

export default InstructionItem;

