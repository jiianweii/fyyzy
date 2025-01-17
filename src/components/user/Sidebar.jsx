import styled from "styled-components";
import Logo from "./../navigation/Logo";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCog,
  faHome,
  faList,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useSidebarContext } from "../../Provider/SidebarProvider";
import { useLogout } from "../authentication/useLogout";

const SideBar = styled.aside`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 250px;
  background-color: #fff;
  border-right: 1px solid #00000025;
  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

const NavBar = styled.nav`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 90%;
  justify-content: space-between;
`;

const NavBarDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.gap};
`;

const NavBarBtn = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 1rem;
  gap: 0.7rem;
  width: 100%;
  font-size: 1.1rem;
  font-weight: 600;

  text-decoration: none;
  color: #526e97;

  &:hover,
  &.active {
    background-color: #f0f0f0;
  }
`;

const LogOutBtn = styled.button`
  width: 100%;
  padding: 1rem;
  text-align: center;
  background-color: #4a8ef3;
  color: #fff;
  font-weight: 600;
  border: none;
  border-radius: 15px;
`;

const NavBarLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Sidebar({ isOpenSideBar }) {
  const { mutate, isPending } = useLogout();

  if (!isOpenSideBar) return;

  return (
    <SideBar>
      <NavBar>
        <NavBarDiv gap="3rem">
          <NavBarLogo>
            <Logo size="md" />
          </NavBarLogo>

          <NavBarDiv gap="1rem">
            <NavBarBtn to="home">
              <FontAwesomeIcon icon={faHome} color="#4a8ef3" />
              <p>Home</p>
            </NavBarBtn>
            <NavBarBtn to="products">
              <FontAwesomeIcon icon={faBox} color="#4a8ef3" />
              <p>Products</p>
            </NavBarBtn>
            <NavBarBtn to="reviews">
              <FontAwesomeIcon icon={faList} color="#4a8ef3" />
              <p>Reviews</p>
            </NavBarBtn>
            <NavBarBtn to="messages">
              <FontAwesomeIcon icon={faMessage} color="#4a8ef3" />
              <p>Messages</p>
            </NavBarBtn>
            <NavBarBtn to="settings">
              <FontAwesomeIcon icon={faCog} color="#4a8ef3" />
              <p>Settings</p>
            </NavBarBtn>
          </NavBarDiv>
        </NavBarDiv>
        <LogOutBtn disabled={isPending} onClick={mutate}>
          Log Out
        </LogOutBtn>
      </NavBar>
    </SideBar>
  );
}
