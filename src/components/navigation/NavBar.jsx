import { StyledDiv, StyledNav } from "../../styles/GlobalStyled";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import Searchbar from "./Searchbar";

export default function NavBar() {
  return (
    <StyledDiv>
      <StyledNav>
        <Logo size="sm" />
        <Searchbar />
        <NavLinks />
      </StyledNav>
    </StyledDiv>
  );
}
