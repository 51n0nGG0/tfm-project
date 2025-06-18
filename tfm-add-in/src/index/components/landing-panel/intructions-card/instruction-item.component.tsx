import React from "react";

import { Image } from "@fluentui/react-image";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface LandingPageCardBodyItemProps {
    imagePath: string,
    text: string,
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

const InstructionItem: React.FC<LandingPageCardBodyItemProps> = ({imagePath, text}) => {
    const styles = useStyles();

    return (
        <div className={styles.item}>
            <Image className={styles.image} src={imagePath}/>
            <p>{text}</p>
        </div>
    );
}

export default InstructionItem;

