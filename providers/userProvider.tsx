"use client";

import { MyUserContextProvider } from "@/hooks/useUser";
import React from "react";

interface userProviderProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<userProviderProps> = ({ children }) => {
  return <MyUserContextProvider>{children}</MyUserContextProvider>;
};

export default UserProvider;
