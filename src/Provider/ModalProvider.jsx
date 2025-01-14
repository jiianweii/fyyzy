import { createContext, useContext, useState } from "react";

const ModalContext = createContext();

export function useModalContext() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});

  return (
    <ModalContext.Provider
      value={{
        isOpenModal,
        setIsOpenModal,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
