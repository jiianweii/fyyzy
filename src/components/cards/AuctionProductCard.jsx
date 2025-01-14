import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getOffer } from "../../services/apiOffer";
import Loader from "../../ui/Loader";
import { convertCurrency } from "../helper/helper";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  cursor: pointer;

  height: 400px;
  width: 280px;
`;

const StyledCardImgDiv = styled.div`
  position: relative;
  height: 60%;

  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    height: ${(props) => (props.image ? "100%" : "40%")};
    width: ${(props) => (props.image ? "100%" : "40%")};
  }
`;

const StyledCardMainDiv = styled.div`
  box-shadow: 0 -2px 0 #00000050;
  padding: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 50%;
`;

const StyledCardMainHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  & h1 {
    font-weight: 400;
    font-size: 1.5rem;
  }
`;

const StyledCardBtmHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & h1 {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

const StyledBiddingDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function AuctionProductCard({
  id,
  name,
  biddingPrice,
  date,
  images,
}) {
  const { data, isPending } = useQuery({
    queryKey: [id],
    queryFn: () => getOffer(id),
  });
  const navigate = useNavigate();

  if (isPending) return <Loader />;

  return (
    <StyledCard onClick={() => navigate(`/marketplace/${id}`)}>
      <StyledCardImgDiv image={images}>
        <img src={images ? images[0] : "./fadzvault.png"} />
      </StyledCardImgDiv>
      <StyledCardMainDiv>
        <StyledCardMainHeader>
          <h1>{name}</h1>
        </StyledCardMainHeader>
        <StyledCardBtmHeader>
          <StyledBiddingDiv>
            <p>{data.length} Bids</p>
            <h1>{convertCurrency(data[0].bidOffer) ?? biddingPrice}</h1>
          </StyledBiddingDiv>
          <h1>{date}</h1>
        </StyledCardBtmHeader>
      </StyledCardMainDiv>
    </StyledCard>
  );
}
