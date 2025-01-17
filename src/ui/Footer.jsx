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

  @media only screen and (max-width: 425px) {
    height: 100%;
    justify-content: flex-start;
    align-items: center;
    font-size: 1.5rem;
  }
`;

const StyledFooterNav = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media only screen and (max-width: 425px) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    row-gap: 4rem;
  }
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
  @media only screen and (max-width: 425px) {
    padding: 2rem 0;
    gap: 1rem;
  }
`;

const StyledCopyrightDiv = styled.div`
  display: flex;
  gap: 0.3rem;
  align-items: center;

  font-size: 0.8rem;
  & h1 {
    font-weight: 400;
  }

  @media only screen and (max-width: 425px) {
    padding: 2rem 0;
  }
`;

const FAVIcon = styled(FontAwesomeIcon)`
  font-size: ${(props) => props.fontSize};
  @media only screen and (max-width: 425px) {
    font-size: 3rem;
  }
`;

export default function Footer() {
  return (
    <StyledFooterDiv bg="#4A8EF3">
      <StyledFooter>
        <StyledFooterNav>
          <StyledFooterNavLinks>
            <h1>Marketplace</h1>
            <StyledLink color="#fff" to="/marketplace?marketplace=Buynow">
              Buy Now
            </StyledLink>
            <StyledLink color="#fff" to="/marketplace?marketplace=Trade">
              Trade Now
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>About</h1>
            <StyledLink color="#fff" to="/our-team">
              Our Team
            </StyledLink>
            <StyledLink color="#fff" to="/how-it-works">
              How It Works
            </StyledLink>
            <StyledLink color="#fff" to="/our-vision">
              Our Vision
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>Support</h1>
            <StyledLink color="#fff" to="/contact-us">
              Contact Us
            </StyledLink>
            <StyledLink color="#fff" to="/terms-and-conditions">
              Terms & Conditions
            </StyledLink>
          </StyledFooterNavLinks>
          <StyledFooterNavLinks>
            <h1>Follow Us On</h1>
            <StyledSocialMediaDiv>
              <StyledLink color="#fff" to="#">
                <FAVIcon icon={faFacebook} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FAVIcon icon={faX} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FAVIcon icon={faInstagram} fontSize={"1.2rem"} />
              </StyledLink>
              <StyledLink color="#fff" to="#">
                <FAVIcon icon={faTiktok} fontSize={"1.2rem"} />
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
