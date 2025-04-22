import React, { useEffect, useState } from "react";
import { Card } from "@fluentui/react-card";
import { Button } from "@fluentui/react-button";
import { ProgressBar } from "@fluentui/react-progress";
import ChartsContainer from "./charts/charts-container.component";
import DiagnosticsAccordion from "./diagnostics/diagnostics-accordion.component";
import { makeStyles } from "@fluentui/react-components";
import PassedAuditsAccordion from "./passed-audits/passed-audits-accordion.component";
import { getMockData } from "../utils/mock.service";

const STEPS = [
  "EXTRACTION",
  "HEADER_ANALYSIS",
  "SEMANTIC_ANALYSIS",
  "ATTACHMENT_SCAN",
  "FINAL_REPORT",
];

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        maxWidth: "800px",
    }
})

const Report:React.FC = () => {

    const styles = useStyles();

    const [currentStep, setCurrentStep] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8765");

        socket.onopen = () => {
        console.log("WebSocket conectado");
        setSocketConnected(true);
        };

        socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setCurrentStep(data.step);
        const stepIndex = STEPS.indexOf(data.step);
        if (stepIndex >= 0) {
            const progressPercentage = ((stepIndex + 1) / STEPS.length) * 100;
            setProgress(progressPercentage);
        }
        };

        socket.onerror = (err) => console.error("WebSocket error:", err);
        socket.onclose = () => setSocketConnected(false);

        return () => socket.close();
    }, []);

    const handleStart = async () => {
        try {
        const response = await fetch("http://localhost:5000/start", {
            method: "POST",
        });
        const data = await response.json();
        console.log("Análisis iniciado:", data);
        } catch (error) {
        console.error("Error al iniciar el análisis:", error);
        }
    };

    const handleMock = async () => {
        getMockData().then((data) => {
            console.log("Recibido:", data);
        })
        .catch((err) => console.error("Error:", err));  
    }

    return (
        <div>
            <Card>
                <div>
                <h2>Análisis de Correo</h2>
                <Button onClick={handleMock}>
                    Iniciar Análisis
                </Button>
                {currentStep && (
                    <div>
                    <p>Paso actual: <strong>{currentStep.replace(/_/g, ' ')}</strong></p>
                    <ProgressBar value={progress} />
                    </div>
                )}
                </div>
            </Card>
            <div className={styles.container}>
                <ChartsContainer/>
                <DiagnosticsAccordion/>      
                <PassedAuditsAccordion/>     
            </div>
        </div>
    );
}

export default Report;