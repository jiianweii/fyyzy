import styled from "styled-components";
import { StyledHomePageItemsDiv, StyledLink } from "../styles/GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import AuctionListing from "../components/sections/AuctionListing";
import CategoryListing from "../components/sections/CategoryListing";
import MarketListing from "../components/sections/MarketListing";

const StyledHomePage = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StyledHomeDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
  gap: 1.5rem;
  background-color: ${(props) => props.bg || "#fff"};
  width: 100%;
`;

const StyledHomeH1 = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.color};
  font-weight: 400;
`;

export default function Homepage() {
  return (
    <StyledHomePage>
      <StyledHomeDiv bg="#4A8EF3">
        <StyledHomePageItemsDiv>
          <StyledHomeH1 color="#fff">Upcoming Auction</StyledHomeH1>
        </StyledHomePageItemsDiv>
        <AuctionListing limit={5} />
      </StyledHomeDiv>
      <StyledHomeDiv bg="#F0F0F0">
        <StyledHomePageItemsDiv>
          <StyledHomeH1 color="#000">All Categories</StyledHomeH1>
          <StyledLink color="#4A8EF3" to="/categories">
            See More <FontAwesomeIcon icon={faChevronRight} fontSize="0.8rem" />
          </StyledLink>
        </StyledHomePageItemsDiv>
        <CategoryListing limit={5} />
      </StyledHomeDiv>
      <StyledHomeDiv bg="#F0F0F0">
        <StyledHomePageItemsDiv>
          <StyledHomeH1 color="#000">Top Picks</StyledHomeH1>
          <StyledLink color="#4A8EF3" to="/marketplace">
            See More <FontAwesomeIcon icon={faChevronRight} fontSize="0.8rem" />
          </StyledLink>
        </StyledHomePageItemsDiv>
        <MarketListing limit={5} />
      </StyledHomeDiv>
    </StyledHomePage>
  );
}
