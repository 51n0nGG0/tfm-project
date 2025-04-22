import React from "react";
import ChartsContainer from "./charts/charts-container.component";
import DiagnosticsAccordion from "./diagnostics/diagnostics-accordion.component";
import PassedAuditsAccordion from "./passed-audits/passed-audits-accordion.component";
import MailDetails from "./mail-tabs/mail-tabs.component";
import { Card } from "@fluentui/react-card";
import { makeStyles, tokens } from "@fluentui/react-components";

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});

const AnalyzerPageBody: React.FC = () => {

    const styles = useStyles();

    return(
        <div>
            <MailDetails/>
            <Card className={styles.card}>
                <ChartsContainer/>
                <DiagnosticsAccordion/>
                <PassedAuditsAccordion/>
            </Card>
            
        </div>
    );
}

export default AnalyzerPageBody;