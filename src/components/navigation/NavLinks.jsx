import { faMessage, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../authentication/useUser";

const StyledNavLinksDiv = styled.div`
  display: flex;
  gap: 2rem;
`;

const StyledLink = styled(Link)`
  color: var(--btn-color);
  font-size: 1.5rem;
`;

const StyledButtonLink = styled(Link)`
  color: #fff;
  background-color: var(--btn-color);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
`;

export default function NavLinks() {
  const { isAuthenticated } = useUser();
  return (
    <StyledNavLinksDiv>
      {isAuthenticated ? (
        <>
          <StyledLink to="/dashboard/messages">
            <FontAwesomeIcon icon={faMessage} />
          </StyledLink>
          <StyledLink to="/dashboard/home">
            <FontAwesomeIcon icon={faUser} />
          </StyledLink>
        </>
      ) : (
        <StyledButtonLink to="/login">Login</StyledButtonLink>
      )}
    </StyledNavLinksDiv>
  );
}
