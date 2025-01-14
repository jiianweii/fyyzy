import styled from "styled-components";
import { StyledFooter, StyledLink } from "../styles/GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCcMastercard,
  faCcPaypal,
  faCcVisa,
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright, faX } from "@fortawesome/free-solid-svg-icons";

const StyledFooterDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
  background-color: ${(props) => props.bg || "#fff"};
  color: #fff;
  height: 250px;
  width: 100%;
`;

const StyledFooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledFooterNavLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  & h1 {
    font-weight: 500;
    font-size: 2rem;
  }
`;

const StyledSocialMediaDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCopyrightDiv = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;

  font-size: 0.8rem;
  & h1 {
    font-weight: 400;
  }
`;

export default function Footer() {
  return (
    <StyledFooterDiv bg="#4A8EF3">
      <StyledFooter>
        <StyledFooterNav>
          <StyledFooterNavLinks>
            <h1>Marketplace</h1>
            <StyledLink color="#fff" to="#">
              Buy Now
            </StyledLink>
            <StyledLink color="#fff" to="#">
              Auction
            </StyledLink>
            <StyledLink color="#fff" to="#">
              Trade Now
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>About</h1>
            <StyledLink color="#fff" to="#">
              Our Team
            </StyledLink>
            <StyledLink color="#fff" to="#">
              How It Works
            </StyledLink>
            <StyledLink color="#fff" to="#">
              Our Vision
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>Support</h1>
            <StyledLink color="#fff" to="#">
              Contact Us
            </StyledLink>
            <StyledLink color="#fff" to="#">
              Terms & Conditions
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>Follow Us On</h1>
            <StyledSocialMediaDiv>
              <StyledLink color="#fff" to="#">
                <FontAwesomeIcon icon={faFacebook} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FontAwesomeIcon icon={faX} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FontAwesomeIcon icon={faInstagram} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FontAwesomeIcon icon={faTiktok} fontSize={"1.2rem"} />
              </StyledLink>
            </StyledSocialMediaDiv>
          </StyledFooterNavLinks>
        </StyledFooterNav>
        <StyledFooterNav>
          <StyledCopyrightDiv>
            <FontAwesomeIcon icon={faCopyright} fontSize={"1rem"} />
            <h1>Copyright By FadzVault</h1>
          </StyledCopyrightDiv>
          <StyledCopyrightDiv>
            <FontAwesomeIcon icon={faCcPaypal} fontSize={"1.5rem"} />
            <FontAwesomeIcon icon={faCcVisa} fontSize={"1.5rem"} />
            <FontAwesomeIcon icon={faCcMastercard} fontSize={"1.5rem"} />
          </StyledCopyrightDiv>
        </StyledFooterNav>
      </StyledFooter>
    </StyledFooterDiv>
  );
}
