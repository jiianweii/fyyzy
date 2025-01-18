import {
  faBox,
  faCog,
  faHome,
  faList,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: none;
  width: 100%;
  background-color: #fff;
  height: 50px;

  @media only screen and (max-width: 425px) {
    display: flex;
  }
`;

const NavBarDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const NavBarBtn = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  gap: 0.7rem;
  width: ${(props) => props.width};
  border-radius: ${(props) => props.br};

  font-size: 1.1rem;
  font-weight: 600;

  text-decoration: none;
  color: ${(props) => props.color || "#526e97"};
  background-color: ${(props) => props.bg};

  &:hover,
  &.active {
    background-color: ${(props) => props.bg || "#f0f0f0"};
  }
`;

export default function BottomBar() {
  return (
    <Nav>
      <NavBarDiv>
        <NavBarBtn to="products">
          <FontAwesomeIcon icon={faBox} color="#4a8ef3" />
          <p>Products</p>
        </NavBarBtn>
        <NavBarBtn to="reviews">
          <FontAwesomeIcon icon={faList} color="#4a8ef3" />
          <p>Reviews</p>
        </NavBarBtn>
        <NavBarBtn
          to="home"
          width={"7rem"}
          bg={"#526E97"}
          color={"#fff"}
          br={"50%"}
        >
          <FontAwesomeIcon icon={faHome} color="#fff" />
          <p>Home</p>
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
    </Nav>
  );
}
