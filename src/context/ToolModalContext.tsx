"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ToolType = "ai-assistant" | "product-finder" | "bundle-builder";

interface ToolModalContextType {
  isOpen: boolean;
  activeTool: ToolType;
  openToolModal: (tool?: ToolType) => void;
  closeToolModal: () => void;
  setActiveTool: (tool: ToolType) => void;
}

const ToolModalContext = createContext<ToolModalContextType | undefined>(undefined);

export function ToolModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<ToolType>("ai-assistant");

  const openToolModal = (tool?: ToolType) => {
    if (tool) {
      setActiveTool(tool);
    }
    setIsOpen(true);
  };

  const closeToolModal = () => {
    setIsOpen(false);
  };

  return (
    <ToolModalContext.Provider
      value={{
        isOpen,
        activeTool,
        openToolModal,
        closeToolModal,
        setActiveTool,
      }}
    >
      {children}
    </ToolModalContext.Provider>
  );
}

export function useToolModal() {
  const context = useContext(ToolModalContext);
  if (!context) {
    throw new Error("useToolModal must be used within a ToolModalProvider");
  }
  return context;
}
