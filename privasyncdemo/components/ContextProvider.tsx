"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

const ADMIN_CODE = 99;
interface GlobalContextType {
  isLoggedIn: boolean | null;
  setLoggedIn: (isLoggedIn: boolean | null) => void;
  isGlobalLoading: boolean;
  setGlobalLoading: (isGlobalLoading: boolean) => void;
  isAdmin: boolean;
  setAdmin: (isAdmin: boolean) => void;
}

const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: null,
  setLoggedIn: () => {},
  isGlobalLoading: false,
  setGlobalLoading: () => {},
  isAdmin: false,
  setAdmin: () => {},
});

export function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [isGlobalLoading, setGlobalLoading] = useState<boolean>(true);
  const [isAdmin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    async function verifyUserStatus() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AUTH_URL}/api/auth/me`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          setLoggedIn(true);
          // uncomment for authorization
          // const data = await response.json();
          // if(data.role == ADMIN_CODE){
          //   setAdmin(true)
          // }else{
          //   setAdmin(false)
          // }
        }else {
          setLoggedIn(false);
        }
    }catch {
        setGlobalLoading(false);
      } finally {
        setGlobalLoading(false);
      }
    }
    // Uncomment for function to be called after backend is written
    // verifyUserStatus();

    // Hardcoding until backend is written
    setLoggedIn(true)
    setAdmin(false)
  }, []);

  const value = {
    isLoggedIn,
    setLoggedIn,
    isGlobalLoading,
    setGlobalLoading,
    isAdmin,
    setAdmin,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export const useGContext = () => useContext(GlobalContext);
