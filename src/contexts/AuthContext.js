"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && session) {
      setUser(session.user);
    } else {
      setUser(null);
    }
    setLoading(status === "loading");
  }, [session, status]);

  const login = async (credentials) => {
    try {
      const result = await signIn("credentials", {
        ...credentials,
        redirect: false,
      });
      if (result.error) {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const logout = () => signOut();

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
