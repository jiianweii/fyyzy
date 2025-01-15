import { faArrowDown, faArrowUp, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import styled, { css } from "styled-components";
import Loader from "../../../ui/Loader";
import { getUserById } from "../../../services/apiUser";
import { convertCurrency, shortenInfo } from "../../helper/helper";
import { updateOffer } from "../../../services/apiOffer";
import toast from "react-hot-toast";
import { createChat } from "../../../services/apiMessenger";

const FullScreen = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: #00000080;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const OfferDiv = styled.div`
  height: 80%;
  width: 800px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
`;

const OfferHeader = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;

  background-color: #526e97;
  color: #fff;

  position: relative;
`;

const OfferUser = styled.div`
  display: flex;
  align-items: center;
  width: 60%;
  gap: 1rem;
  height: 60px;

  & img {
    height: 60px;
    width: 60px;
    border-radius: 9999px;
  }

  & div {
    display: flex;
    flex-direction: column;
    & h1 {
      font-size: 1.7rem;
    }

    & p {
      font-size: 0.9rem;
    }
  }
`;

const OfferExitBtn = styled.button`
  padding: 1rem;

  background-color: #4a8ef3;
  color: #fff;

  font-size: 1rem;
  border: none;

  position: absolute;
  top: 0;
  right: 0;
`;

const UserButton = styled.button`
  height: 40px;
  width: 120px;

  background-color: #f55a5a;
  color: #fff;
  border: none;
`;

const OfferZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-self: center;

  height: 100%;
  width: 90%;
`;

const OfferTradeZone = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  gap: 2rem;
  width: 100%;
  color: #000;
`;

const OfferTrade = styled.div`
  border: 1px solid #00000050;
  padding: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OfferTradePrimary = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const OfferTradePrimaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  & img {
    height: 100px;
    min-width: 80px;
  }

  & div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    & h1 {
      font-size: 1rem;
    }

    & p {
      font-size: 0.7rem;
    }
  }
`;

const OfferTradeSecondary = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & ul {
    padding-left: 20px;
  }
`;

const OfferTradePrice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: right;
`;

const OfferSelection = styled.div`
  display: flex;
  gap: 1rem;
  align-self: center;
`;

const OfferArrows = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

const OfferButton = styled.button`
  width: 125px;
  height: 50px;
  border: none;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  ${(props) =>
    props.btnType == "accept" &&
    css`
      background-color: #4a8ef3;
    `}
  ${(props) =>
    props.btnType == "decline" &&
    css`
      background-color: #f55a5a;
    `}
`;

export default function Offer({ currentOffer, setIsOpenModal }) {
  const { offer, product } = currentOffer;
  const { data: user, isPending } = useQuery({
    queryKey: [offer],
    queryFn: () => getUserById(offer.offerer_id),
  });

  async function handleAccept() {
    updateOffer(offer.id, "ACCEPTED");
    createChat(product.id, offer.id, offer.offerer_id, product.created_by);

    toast.success(`You have accepted offer from ${user[0].name}`);
    setIsOpenModal(false);
  }
  function handleDecline() {
    updateOffer(offer.id, "REJECTED");

    toast.success(`You have rejected offer from ${user[0].name}`);
    setIsOpenModal(false);
  }

  function handleExit(e) {
    if (e.target.id == "fullscreen") setIsOpenModal(false);
  }

  if (isPending) return <Loader />;

  const current_user = user[0];

  return (
    <FullScreen id="fullscreen" onClick={handleExit}>
      <OfferDiv>
        <OfferHeader>
          <OfferUser>
            <img src={current_user.image} />
            <div>
              <h1>{current_user.name}</h1>
              <p>@{current_user.email}</p>
            </div>
          </OfferUser>
          <UserButton>View Profile</UserButton>
          <OfferExitBtn onClick={() => setIsOpenModal(false)}>
            <FontAwesomeIcon icon={faX} />
          </OfferExitBtn>
        </OfferHeader>
        <OfferZone>
          <OfferTradeZone>
            <OfferTrade>
              <OfferTradePrimary>
                <OfferTradePrimaryInfo>
                  <img src={product.images[0]} />
                  <div>
                    <h1>{shortenInfo(product.name)}</h1>
                    <p>{shortenInfo(product.description)}</p>
                  </div>
                </OfferTradePrimaryInfo>
                {product.type == "Buynow" && (
                  <OfferTradePrice>
                    <h1>Initial Price:</h1>
                    <p>{convertCurrency(product.price)}</p>
                  </OfferTradePrice>
                )}
                {product.type == "Auction" && (
                  <OfferTradePrice>
                    <h1>Starting Bid:</h1>
                    <p>{convertCurrency(product.biddingPrice)}</p>
                  </OfferTradePrice>
                )}
              </OfferTradePrimary>
              {product.type == "Trade" && (
                <OfferTradeSecondary>
                  <h1>Looking for:</h1>
                  <ul>
                    {product.tradeOffer.map((p) => {
                      return <li>{p}</li>;
                    })}
                  </ul>
                </OfferTradeSecondary>
              )}
            </OfferTrade>
            <OfferArrows>
              <FontAwesomeIcon icon={faArrowDown} />
              <FontAwesomeIcon icon={faArrowUp} />
            </OfferArrows>
            <OfferTrade>
              <OfferTradePrimary>
                <h1>{current_user.name}'s Offer:</h1>
                {product.type == "Buynow" && (
                  <OfferTradePrice>
                    <h1>Offered Price:</h1>
                    <p>{convertCurrency(offer.buyOffer)}</p>
                  </OfferTradePrice>
                )}
                {product.type == "Auction" && (
                  <OfferTradePrice>
                    <h1>Offered Price:</h1>
                    <p>{convertCurrency(offer.bidOffer)}</p>
                  </OfferTradePrice>
                )}
              </OfferTradePrimary>
              {product.type == "Trade" && (
                <OfferTradeSecondary>
                  <h1>Looking for:</h1>
                  <ul>
                    {offer.tradeOffer.map((o) => {
                      return <li>{o}</li>;
                    })}
                  </ul>
                </OfferTradeSecondary>
              )}
            </OfferTrade>
          </OfferTradeZone>

          <OfferSelection>
            <OfferButton btnType={"accept"} onClick={handleAccept}>
              Accept Offer
            </OfferButton>
            <OfferButton btnType={"decline"} onClick={handleDecline}>
              Decline Offer
            </OfferButton>
          </OfferSelection>
        </OfferZone>
      </OfferDiv>
    </FullScreen>
  );
}
