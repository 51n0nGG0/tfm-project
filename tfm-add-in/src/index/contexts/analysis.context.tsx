import React, { createContext, useContext, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { getMessage } from "../../services/microsoftService";
import { useAuth } from "./auth.context";
import { Report } from "../types/report";

const WEBSOCKET_URL = "http://localhost:5001";
const API_URL = "http://localhost:5000/analyze";

interface AnalysisContextType {
    launchAnalysis: (messageId: string) => void;
    report: Report | null;
    analysisStatus: string;
    analysisProgress: number;
    analysisMessage: string;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { accessToken } = useAuth();
    const socketRef = useRef<Socket | null>(null);
    const [report, setReport] = useState<Report | null>(null);
    const [analysisStatus, setAnalysisStatus] = useState<string>("NOT_STARTED")
    const [analysisProgress, setAnalysisProgress] = useState<number>(0)
    const [analysisMessage, setAnalysisMessage] = useState<string>("")

    const launchAnalysis = async (messageId: string) => {
        if (!socketRef.current) {
            socketRef.current = io(WEBSOCKET_URL);
        }

        socketRef.current.on("analysis_on_course", (payload) => {
            setAnalysisMessage(payload.desc);
            setAnalysisProgress(payload.progress);
        });

        socketRef.current.on("analysis_completed", (payload) => {
            socketRef.current?.disconnect()
            socketRef.current = null
            const data = JSON.parse(payload.report);
            setReport(data);
            setAnalysisStatus("COMPLETED")
        });

        socketRef.current.on("disconnect", () => {
            console.log("WebSocket desconectado");
        });

        socketRef.current.on("connect", async () => {
            const client_id = socketRef.current!.id;

            const message = await getMessage(messageId, accessToken);

            try {
                const res = await fetch(API_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        message: message?.body?.content,
                        client_id,
                    }),
                });

                if (!res.ok) throw new Error("Fallo al iniciar análisis");
                console.log("Análisis iniciado correctamente");
                setAnalysisStatus("ON_COURSE")
            } catch (err) {
                console.error("Error al lanzar análisis:", err);
            }
        });
    };

    return (
        <AnalysisContext.Provider value={{ launchAnalysis, report, analysisStatus, analysisMessage, analysisProgress }}>
            {children}
        </AnalysisContext.Provider>
    );
};

export const useAnalysis = (): AnalysisContextType => {
    const context = useContext(AnalysisContext);
    if (!context) {
        throw new Error("useAnalysis debe usarse dentro de AnalysisProvider");
    }
    return context;
};