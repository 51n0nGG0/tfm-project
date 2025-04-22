export const getMockData = async (): Promise<Record<string, unknown>> => {
    const response = await fetch("http://localhost:5000/mockResponse");
  
    if (!response.ok) {
      throw new Error("Error al obtener el JSON del servidor");
    }
  
    const data: Record<string, unknown> = await response.json();
    return data;
};

export const getMockMessage = async (): Promise<Record<string, unknown>> => {
  const response = await fetch("http://localhost:5000/mockMessage");

  if (!response.ok) {
    throw new Error("Error al obtener el JSON del servidor");
  }

  const data: Record<string, unknown> = await response.json();
  console.log(data);
  return data;
};

