import React from "react";

import { CardHeader } from "@fluentui/react-card";
import { Title3 } from "@fluentui/react-text";

import { makeStyles } from "@griffel/react/makeStyles.cjs";

interface InstructionsCardHeaderProps {
    title: string,
}

const useStyles = makeStyles({
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    }
})

const InstructionsCardHeader: React.FC<InstructionsCardHeaderProps> = ({ title }) => {
    const styles = useStyles();

    return (
        <CardHeader className={styles.header}
            header={
                <Title3 align="center">{ title }</Title3>
            }/>
    );
}

export default InstructionsCardHeader;