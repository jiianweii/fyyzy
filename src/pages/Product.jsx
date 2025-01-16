import styled from "styled-components";
import { StyledDiv, StyledMiniLink } from "../styles/GlobalStyled";
import { Link, useParams } from "react-router-dom";
import ProductImage from "../components/product/ProductImage";
import ProductInfo from "../components/product/ProductInfo";
import BuyNowCard from "../components/cards/BuyNowCard";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/apiProduct";
import Loader from "../ui/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import OfferModal from "../components/modal/OfferModal";
import { useState } from "react";
import OtherListing from "../components/product/OtherListing";

const StyledProductSection = styled.section`
  display: flex;
  flex-direction: column;
  padding: 2rem 0;
  gap: 2rem;
  min-height: 100vh;
  width: 80%;
`;

const StyledProductInfoDiv = styled.div`
  display: flex;
  height: 600px;
  justify-content: center;
  gap: 4rem;

  position: relative;
`;

const StyledH1 = styled.h1`
  font-size: 1.5rem;
`;

export default function Product() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  function sortPageName(name) {
    return name.split(" ").join("-").toLowerCase();
  }
  const { type, id } = useParams();
  const pageType = type.charAt(0).toUpperCase() + type.substring(1);

  const { data, isPending, error } = useQuery({
    queryKey: [id],
    queryFn: () => getProductById(id),
  });

  if (isPending)
    return (
      <StyledDiv bg="#f0f0f0">
        <Loader />
      </StyledDiv>
    );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (data.products.length == 0)
    return (
      <StyledDiv bg="#f0f0f0">
        <div>No data</div>
      </StyledDiv>
    );

  return (
    <StyledDiv bg="#f0f0f0">
      <StyledProductSection>
        <StyledMiniLink>
          <Link to="/">Home</Link> <FontAwesomeIcon icon={faChevronRight} />
          <Link to="/marketplace">{pageType}</Link>
          <FontAwesomeIcon icon={faChevronRight} />
          <p>{sortPageName(data.products[0].name)}</p>
        </StyledMiniLink>
        <StyledProductInfoDiv>
          {isOpenModal && (
            <OfferModal
              setIsOpenModal={setIsOpenModal}
              type={data.products[0].type}
              data={data.products[0]}
              bidOffer={data.offers?.[0].bidOffer}
            />
          )}
          <ProductImage images={data.products[0].images} />
          <ProductInfo
            type={data.products[0].type}
            data={data.products[0]}
            offers={data.offers}
            setIsOpenModal={setIsOpenModal}
          />
        </StyledProductInfoDiv>
        <StyledH1>Other Listing</StyledH1>
        <OtherListing curr_id={id} seller_id={data.products[0].created_by} />
      </StyledProductSection>
    </StyledDiv>
  );
}
