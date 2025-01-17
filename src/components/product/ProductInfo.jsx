import styled from "styled-components";
import SellerInfo from "./SellerInfo";
import { convertCurrency, convertDate } from "./../helper/helper";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/useUser";
import Loader from "../../ui/Loader";
import toast from "react-hot-toast";

const StyledInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  width: 80%;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const StyledInfoSubHeader = styled.h1`
  font-size: 1rem;
  color: #3c3c3c;
`;
const StyledInfoHeader = styled.h1`
  font-size: 2.5rem;
`;

const StyledBiddingDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const StyledBidsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & h1 {
    font-size: 2rem;
    font-weight: 600;
  }
  & h2 {
    font-size: 1rem;
    font-weight: 400;
  }

  & input {
    width: 150px;
    padding: 1rem 0.5rem;
    border: 1px solid #4a8ef3;
  }
`;

const StyledButton = styled.button`
  width: 100%;
  height: 50px;
  background-color: #4a8ef3;
  border: none;
  text-align: center;
  padding: 0.5rem;
  color: #fff;
  font-weight: 700;
  font-size: 1.5rem;
  cursor: pointer;
`;

const StyledDescription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledUl = styled.ul`
  & li {
    margin-left: 20px;
  }
`;

export default function ProductInfo({ type, data, setIsOpenModal, offers }) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();
  function handleClick() {
    if (!isAuthenticated && !isLoading) {
      toast.error("Please login before proceeding");
      navigate("/login");
    }
    setIsOpenModal(true);
  }

  if (isLoading) return <Loader />;

  return (
    <StyledInfoSection>
      <StyledInfoSubHeader>
        {type == "Auction"
          ? "BIDDING ENDS IN: 18hrs+"
          : `DATE POSTED: ${convertDate(data.created_at)}`}
      </StyledInfoSubHeader>

      <StyledInfoHeader>{data.name}</StyledInfoHeader>
      {type == "Auction" && (
        <>
          <StyledBiddingDiv>
            <StyledBidsDiv>
              <h2>Current Bid</h2>
              <h1>
                {offers[0]?.bidOffer
                  ? convertCurrency(offers[0].bidOffer)
                  : convertCurrency(data.biddingPrice)}{" "}
              </h1>
            </StyledBidsDiv>
            <StyledBidsDiv>
              <h2>Bids</h2>
              <h1>{offers.length}</h1>
            </StyledBidsDiv>
          </StyledBiddingDiv>
        </>
      )}
      {type == "Buynow" && (
        <StyledBidsDiv>
          <h2>Price:</h2>
          <h1>{convertCurrency(data.price)}</h1>
        </StyledBidsDiv>
      )}
      {type == "Trade" && (
        <StyledBidsDiv>
          <h1>I am looking for:</h1>
          <StyledUl>
            {data.tradeOffer.map((d) => {
              return <li>{d}</li>;
            })}
          </StyledUl>
        </StyledBidsDiv>
      )}
      {type == "Auction" && (
        <StyledButton onClick={handleClick}>BID NOW</StyledButton>
      )}

      {type == "Trade" && (
        <StyledButton onClick={handleClick}>SEND OFFER</StyledButton>
      )}

      {type == "Buynow" && (
        <StyledButton onClick={handleClick}>BUY NOW</StyledButton>
      )}

      <SellerInfo id={data.created_by} />
      <StyledDescription>
        <h1>Description:</h1>
        <p>{data.description}</p>
      </StyledDescription>
    </StyledInfoSection>
  );
}
