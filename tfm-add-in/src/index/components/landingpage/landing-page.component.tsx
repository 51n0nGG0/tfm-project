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

interface LandingPageProps {
    login: ()=>void
}


const LandingPage: React.FC<LandingPageProps> = ({login}) => {

    const styles = useStyles();

    return (
        <>
            <main className={styles.mainComponent}>
                <LandingPageHeader login={login}/>
                <InstructionsCard/>
            </main>
        </>
    );
}

export default LandingPage;