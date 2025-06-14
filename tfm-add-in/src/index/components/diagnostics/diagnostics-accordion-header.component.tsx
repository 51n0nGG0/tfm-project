import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

import { Body2 } from "@fluentui/react-text";
import { Divider } from "@fluentui/react-divider";

interface DiagnosticsAccordionHeaderProps {
    diagnosticsNumber: number
}

const useStyles = makeStyles({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    title: {
        lineHeight: "44px",
    },
});

const DiagnosticsAccordionHeader: React.FC<DiagnosticsAccordionHeaderProps> = ({diagnosticsNumber}) => {

    const styles = useStyles();

    return(
        <div className={styles.container}>
            <Body2 className={styles.title}>DIAGNÓSTICO ({diagnosticsNumber})</Body2>
            <Divider/>
        </div>
    );
}

export default DiagnosticsAccordionHeader;