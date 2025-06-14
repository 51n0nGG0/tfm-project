import { Card, makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import ChartsContainer from "./charts/charts-container.component";
import DiagnosticsAccordion from "./diagnostics/diagnostics-accordion.component";
import PassedAuditsAccordion from "./passed-audits/passed-audits-accordion.component";
import { useAnalysis } from "../contexts/analysis.context";

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});

const ReportCard: React.FC = () => {

    const styles = useStyles();

    const {report} = useAnalysis();

    return(
        <Card className={styles.card}>
            <ChartsContainer summary={report?.summary}/>
            <DiagnosticsAccordion diagnostics={report?.diagnostics}/>
            <PassedAuditsAccordion passedAudits={report?.passedAudits}/>
        </Card>
    );
}

export default ReportCard;