import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
    accessToken: string;
    setAccessToken: (token: string) => void;
    accountName: string;
    setAccountName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string | undefined>();
    const [accountName, setAccountName] = useState<string | undefined>();

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, accountName, setAccountName }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};