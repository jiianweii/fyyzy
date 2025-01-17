import styled from "styled-components";
import Sidebar from "../ui/Sidebar";
import { StyledDiv, StyledMiniLink } from "../styles/GlobalStyled";
import MarketListing from "./../components/sections/MarketListing";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const StyledSection = styled.section`
  display: flex;
  min-height: 100vh;
  gap: 2rem;
  width: 80%;
  @media only screen and (max-width: 425px) {
    flex-direction: column;
    width: 100%;
  }
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

  @media only screen and (max-width: 425px) {
    justify-content: center;
    gap: 1rem;
  }
`;

const StyledSelect = styled.select`
  padding: 0.5rem;
  @media only screen and (max-width: 425px) {
    font-size: 0.9rem;
  }
`;

export default function Marketplace() {
  const { type } = useParams();
  const [searchCategories, setSearchCategories] = useState([]);
  const [searchSort, setSearchSort] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  // This page will be used for trading, buying and auction items
  // Therefore, you should use parameters to see what is the requirement
  // Before fetching the necessary data
  const pageType = type.charAt(0).toUpperCase() + type.substring(1);

  const categories = searchCategories.length > 0 ? searchCategories : "";

  return (
    <StyledDiv bg="F0F0F0">
      <StyledSection>
        <Sidebar setSearchCategories={setSearchCategories} />
        <StyledBuyNowDiv>
          <StyledHelper>
            <StyledMiniLink>
              <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} />
              <Link to={`/${type}`}>{pageType}</Link>
            </StyledMiniLink>
            <StyledSelect
              onChange={(e) => {
                const val = e.target.value.split(",");
                setSearchSort({
                  value: val[0],
                  ...(val[1] == "asc" && { ascending: true }),
                  ...(val[1] == "desc" && { descending: true }),
                });
              }}
            >
              <option value="created_at,asc">Recently Added</option>
              <option value="price,asc">Low Price</option>
              <option value="price,desc">High Price</option>
              <option value="created_at,desc">Oldest To Newest</option>
            </StyledSelect>
          </StyledHelper>
          <MarketListing
            value={searchParams.get("value")}
            type={searchParams.get("type")}
            marketplace={searchParams.get("marketplace")}
            searchSort={searchSort}
            categories={categories}
            category={searchParams.get("category")}
            id={searchParams.get("id")}
          />
        </StyledBuyNowDiv>
      </StyledSection>
    </StyledDiv>
  );
}
