"use client";

import { createContext, type ReactNode, useContext } from "react";

import type { Messages } from "./locales/en.ts";
import type { Locale } from "./types.ts";

type MessagesContextValue = {
  locale: Locale;
  messages: Messages;
};

const MessagesContext = createContext<MessagesContextValue | null>(null);

export function MessagesProvider({
  children,
  locale,
  messages,
}: MessagesContextValue & { children: ReactNode }) {
  return (
    <MessagesContext.Provider value={{ locale, messages }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages(): MessagesContextValue {
  const value = useContext(MessagesContext);

  if (!value) {
    throw new Error("useMessages must be used inside MessagesProvider");
  }

  return value;
}
