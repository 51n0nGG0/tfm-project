import React from "react";

import InstructionsCard from "./intructions-card/instructions-card.component";
import InformationCard from "./information-card/information-card.component";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: tokens.spacingVerticalXL,        
    }
})

interface LandingPanelProps {
    login: ()=>void
}


const LandingPanel: React.FC<LandingPanelProps> = ({login}) => {

    const styles = useStyles();

    return (
        <>
            <div className={styles.container}>
                <InformationCard login={login}/>
                <InstructionsCard/>
            </div>
        </>
    );
}

export default LandingPanel;