export const startAnalysis = async (message: string, clientId: string): Promise<Record<string, unknown>> => {
    const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message,
            client_id: clientId
        })
    });

    if (!response.ok) {
        throw new Error("Error al iniciar el análisis");
    }

    const data: Record<string, unknown> = await response.json();
    return data;
};