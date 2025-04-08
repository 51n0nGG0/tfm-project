import React from "react";

import { makeStyles } from "@griffel/react/makeStyles.cjs";
import { tokens } from "@fluentui/tokens";

import InstructionsCard from "./instructions-card.component";
import LandingPageHeader from "./landing-page-header.component";

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


const LandingPage: React.FC = () => {

    const styles = useStyles();

    return (
        <>
            <main className={styles.mainComponent}>
                <LandingPageHeader/>
                <InstructionsCard/>
            </main>
        </>
    );
}

export default LandingPage;