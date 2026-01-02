import { createContext, useContext, ReactNode } from "react";
import { useTakeover } from "@/hooks/use-takeover";

interface TakeoverContextType {
  isOpen: boolean;
  openTakeover: () => void;
  closeTakeover: () => void;
}

const TakeoverContext = createContext<TakeoverContextType | undefined>(undefined);

interface TakeoverProviderProps {
  children: ReactNode;
}

/**
 * Provider component for takeover state management.
 * Wrap your app/page with this to enable takeover functionality.
 */
export function TakeoverProvider({ children }: TakeoverProviderProps) {
  const takeoverState = useTakeover();

  return (
    <TakeoverContext.Provider value={takeoverState}>
      {children}
    </TakeoverContext.Provider>
  );
}

/**
 * Hook to access takeover state and controls from any component.
 * Must be used within a TakeoverProvider.
 */
export function useTakeoverContext() {
  const context = useContext(TakeoverContext);
  if (context === undefined) {
    throw new Error("useTakeoverContext must be used within a TakeoverProvider");
  }
  return context;
}
