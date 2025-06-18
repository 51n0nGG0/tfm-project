import React from "react";

import InstructionsCard from "./intructions-card/instructions-card.component";
import InformationCard from "./information-card/information-card.component";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

const useStyles = makeStyles({
    mainComponent: {
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
            <main className={styles.mainComponent}>
                <InformationCard login={login}/>
                <InstructionsCard/>
            </main>
        </>
    );
}

export default LandingPanel;