"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface RegistrationContextValue {
  isOpen: boolean;
  openRegistration: () => void;
  closeRegistration: () => void;
}

const RegistrationContext = createContext<RegistrationContextValue | null>(
  null
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = useCallback(() => setIsOpen(true), []);
  const closeRegistration = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, openRegistration, closeRegistration }),
    [isOpen, openRegistration, closeRegistration]
  );

  return (
    <RegistrationContext.Provider value={value}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error("useRegistration must be used within RegistrationProvider");
  }
  return context;
}
