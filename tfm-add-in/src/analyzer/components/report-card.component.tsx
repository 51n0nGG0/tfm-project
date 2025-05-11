import { Card, makeStyles, tokens } from "@fluentui/react-components";
import React from "react";
import ChartsContainer from "./charts/charts-container.component";
import DiagnosticsAccordion from "./diagnostics/diagnostics-accordion.component";
import PassedAuditsAccordion from "./passed-audits/passed-audits-accordion.component";
import { Report } from "../types/report";

interface ReportCardProps {
    report: Report,
}

const useStyles = makeStyles({
    card: {
        margin: tokens.spacingHorizontalM,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    }
});

const ReportCard: React.FC<ReportCardProps> = () => {

    const styles = useStyles();

    return(
        <Card className={styles.card}>
            <ChartsContainer/>
            <DiagnosticsAccordion/>
            <PassedAuditsAccordion/>
        </Card>
    );
}

export default ReportCard;