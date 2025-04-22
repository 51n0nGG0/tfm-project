import React from "react";
import AnalyzerPageHeader from "./analyzer-page-header.component";
import AnalyzerPageBody from "./analyzer-page-body.component";

const AnalyzerPage: React.FC = () => {
    return(
        <>
            <AnalyzerPageHeader/>
            <AnalyzerPageBody/>
        </>
    );
}

export default AnalyzerPage;