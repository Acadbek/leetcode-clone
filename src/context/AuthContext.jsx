import { httpClient } from "@/api/httpClient";
import React from "react";

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = React.useState(
    localStorage.getItem("accessToken")
  );

  const login = async (email, password) => {
    const response = await httpClient.post("/auth/login", {
      json: { email, password }
    }).json();

    setAccessToken(response.accessToken);
    localStorage.setItem("accessToken", response.accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
  }

  const logout = () => {
    setAccessToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  const register = async (email, password) => {
    await httpClient.post("auth/register", {
      json: { email, password },
    }).json();
  };

  const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return;

    const response = await httpClient.post("auth/refresh", {
      json: { refreshToken },
    }).json();

    setAccessToken(response.accessToken);
    localStorage.setItem("accessToken", response.accessToken);
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout, register, refreshToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}