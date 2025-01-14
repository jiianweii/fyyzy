// import { Link } from "react-router-dom";
// import styled from "styled-components";

// const StyledLogo = styled(Link)`
//   font-size: 2rem;
//   font-weight: 900;
//   color: var(--btn-color);
//   text-decoration: none;
// `;
// export default function Logo() {
//   return <StyledLogo to="/">FadzVault</StyledLogo>;
// }

import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 100%;
    ${(props) => props.size == "sm" && "height: 20px;"}
    ${(props) => props.size == "md" && "height: 25px;"}
    ${(props) => props.size == "lg" && "height: 30px;"}
  }
`;
export default function Logo({ size }) {
  return (
    <StyledLogo to="/" size={size}>
      <img src="/FadzVaultLogo.png" />
    </StyledLogo>
  );
}
