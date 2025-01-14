import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export function useSidebarContext() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }) {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  return (
    <SidebarContext.Provider value={{ isOpenSideBar, setIsOpenSideBar }}>
      {children}
    </SidebarContext.Provider>
  );
}
