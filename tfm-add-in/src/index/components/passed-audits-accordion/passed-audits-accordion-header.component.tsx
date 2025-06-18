import React from "react";

import { Button } from "@fluentui/react-button";
import { Body2, Caption1 } from "@fluentui/react-text";
import { Divider } from "@fluentui/react-divider";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface PassedAuditsAccordionHeaderProps {
    onToggle: () => void,
    isOpen: boolean,
    passedAuditsNumber: number,
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    contentContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        lineHeight: "44px",
    },
    button: {
        padding: "0",
        minWidth: "0",
    }
});

const PassedAuditsAccordionHeader: React.FC<PassedAuditsAccordionHeaderProps> = ({onToggle, isOpen, passedAuditsNumber}) => {

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                <Body2 className={styles.title}>AUDITORIAS PASADAS ({passedAuditsNumber})</Body2>
                <Button className={styles.button} appearance="transparent" onClick={onToggle}>
                    { isOpen ? 
                        <Caption1>Hide</Caption1>
                        :
                        <Caption1>Show</Caption1>
                    }
                </Button>
            </div>
            <Divider/>
        </div>
    );
}

export default PassedAuditsAccordionHeader;