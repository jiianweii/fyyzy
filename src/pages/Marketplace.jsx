import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import { StyledDiv, StyledMiniLink } from "../styles/GlobalStyled";
import MarketListing from "./../components/sections/MarketListing";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const StyledSection = styled.section`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  width: 80%;
`;

const StyledBuyNowDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem 0;
  gap: 2rem;
`;

const StyledHelper = styled.div`
  display: flex;

  justify-content: space-between;
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
`;

export default function Marketplace() {
  const { type } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // This page will be used for trading, buying and auction items
  // Therefore, you should use parameters to see what is the requirement
  // Before fetching the necessary data
  const pageType = type.charAt(0).toUpperCase() + type.substring(1);

  return (
    <StyledDiv bg="F0F0F0">
      <StyledSection>
        <Sidebar />
        <StyledBuyNowDiv>
          <StyledHelper>
            <StyledMiniLink>
              <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} />
              <Link to={`/${type}`}>{pageType}</Link>
            </StyledMiniLink>
            <StyledSelect>
              <option value="recent">Recently Added</option>
              <option value="-price">Low Price</option>
              <option value="+price">High Price</option>
              <option value="-date">Newest To Oldest</option>
              <option value="+date">Oldest To Newest</option>
            </StyledSelect>
          </StyledHelper>
          <MarketListing
            type={searchParams.get("type")}
            category={searchParams.get("category")}
            id={searchParams.get("id")}
          />
        </StyledBuyNowDiv>
      </StyledSection>
    </StyledDiv>
  );
}
