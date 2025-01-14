import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getProductsByAuctionId } from "../../services/apiProduct";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  cursor: pointer;

  height: 350px;
  width: 280px;
`;

const StyledCardImgDiv = styled.div`
  position: relative;
  height: 200px;

  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    height: 40%;
    width: 40%;
  }
`;

const StyledCardStatus = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;

  background-color: #000;
  border-radius: 15px;
  padding: 0.5rem 1rem;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  & h1 {
    font-size: 0.8rem;
    font-weight: 300;
    color: #fff;
  }
`;

const StyledCardStatusIcon = styled.div`
  height: 7px;
  width: 7px;
  border-radius: 9999px;
  background-color: ${(props) => props.color};
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
  & h2 {
    font-weight: 300;
    font-size: 1rem;
  }
`;

const StyledCardBtmHeader = styled.div`
  display: flex;
  justify-content: space-between;

  & h1 {
    font-weight: 400;
    font-size: 1.4rem;
  }
`;

// listing={
//   d.listing != null
//     ? `${d.listing.length}+ Listing Available`
//     : "No information provided at the moment"
// }

export default function AuctionCard({ id, color, status, deadline, name }) {
  const navigate = useNavigate();
  const { data, isPending, error } = useQuery({
    queryKey: ["auctionProduct", id],
    queryFn: () => getProductsByAuctionId(id),
  });

  if (isPending) return <Loader />;

  return (
    <StyledCard onClick={() => navigate(`/marketplace?type=auction&id=${id}`)}>
      <StyledCardImgDiv>
        <img src="/fadzvault.png" />
        <StyledCardStatus>
          <StyledCardStatusIcon color={color} />
          <h1>{status}</h1>
        </StyledCardStatus>
      </StyledCardImgDiv>
      <StyledCardMainDiv>
        <StyledCardMainHeader>
          <h1>{name}</h1>
          <h2>
            {data.length > 0
              ? `${data.length} Listing Available`
              : "No information provided at the moment"}
          </h2>
        </StyledCardMainHeader>
        <StyledCardBtmHeader>
          <h1>{deadline}</h1>
        </StyledCardBtmHeader>
      </StyledCardMainDiv>
    </StyledCard>
  );
}
