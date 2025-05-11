import React, { useState } from "react";
import MessagesCard from "./messages-card.component";
import ReportCard from "./report-card.component";
import { Report } from "../types/report";

const AnalyzerPageBody: React.FC = () => {

    const [report, setReport] = useState<Report>();

    return(
        <div>
            <MessagesCard onReportRequest={setReport}/>
            {report && <ReportCard report={report} />}
        </div>
    );
}

export default AnalyzerPageBody;