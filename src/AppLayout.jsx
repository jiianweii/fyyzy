import styled from "styled-components";
import NavBar from "./components/navigation/NavBar";
import Footer from "./ui/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

const StyledBody = styled.section`
  display: flex;
  flex-direction: column;
`;

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <StyledBody>
      <NavBar />
      <Outlet />
      <Footer />
    </StyledBody>
  );
}
