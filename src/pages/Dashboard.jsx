import { Outlet } from "react-router-dom";
import Sidebar from "../components/user/Sidebar";
import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ProductModal from "../components/modal/ProductModal";
import { useModalContext } from "../Provider/ModalProvider";
import BottomBar from "../components/user/BottomBar";

const Section = styled.section`
  display: flex;

  height: 100vh;
  width: 100vw;

  position: relative;

  @media only screen and (max-width: 425px) {
    flex-direction: column;
  }
`;

const HomeSection = styled.section`
  background-color: #526e97;
  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;

  overflow-y: auto;
  position: relative;
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0;
  left: 0;
  border: none;
  padding: 1rem;
  background-color: #fff;
  z-index: 1;

  cursor: pointer;
  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export default function Dashboard() {
  const [isOpenSideBar, setIsOpenSideBar] = useState(true);
  const { isOpenModal } = useModalContext();

  return (
    <Section>
      {isOpenModal && <ProductModal />}
      <Sidebar isOpenSideBar={isOpenSideBar} />
      <HomeSection>
        <CloseBtn onClick={() => setIsOpenSideBar(!isOpenSideBar)}>
          <FontAwesomeIcon
            icon={isOpenSideBar ? faChevronLeft : faChevronRight}
          />
        </CloseBtn>
        <Outlet />
      </HomeSection>
      <BottomBar />
    </Section>
  );
}
