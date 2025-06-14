import React, { useRef, useState } from "react";
import MessagesCard from "./messages-card.component";
import ReportCard from "./report-card.component";
import { useAnalysis } from "../contexts/analysis.context";

const AnalyzerPageBody: React.FC = () => {

    const {report} = useAnalysis();

    return(
        <div>
            <MessagesCard/>
            {report && <ReportCard/>}
        </div>
    );
}

export default AnalyzerPageBody;