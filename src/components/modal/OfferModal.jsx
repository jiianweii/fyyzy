import styled, { css } from "styled-components";
import { convertCurrency, shortenInfo } from "../helper/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  createBidOffer,
  createBuyOffer,
  createTradeOffer,
} from "../../services/apiOffer";

const Modal = styled.div`
  height: 600px;
  width: 600px;
  background-color: #fff;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 425px) {
    height: 100%;
    width: 100%;
  }

  gap: 1rem;
`;

const ModalHeader = styled.div`
  display: flex;
  padding: 1rem;
  gap: 1rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  align-items: center;
  background-color: #526e97;
  color: #fff;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) => props.jc};
  padding: ${(props) => props.padding};

  gap: 1rem;
  height: ${(props) => props.h};
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid #526e97;
`;

const Button = styled.button`
  padding: 1rem;
  width: 200px;
  color: #fff;
  border: none;
  font-weight: 700;
  border-radius: 8px;
  font-size: 1.2rem;

  align-self: center;

  ${(props) =>
    props.t == "accept" &&
    css`
      background-color: #526e97;
    `}
  ${(props) =>
    props.t == "decline" &&
    css`
      background-color: #fff;
      border: 1px solid #526e97;
      color: #526e97;
    `}
`;

const Product = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const ProductImg = styled.img`
  height: 70px;
  min-width: 50px;
`;

const ProductInfo = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ProductInfoFirst = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const InfoH1 = styled.h1`
  font-size: 1rem;
`;

const UL = styled.ul`
  padding: 0 1.5rem;
`;

export default function OfferModal({ setIsOpenModal, type, data, bidOffer }) {
  const [price, setPrice] = useState(data.price || 0);
  const [bid, setBid] = useState(bidOffer + bidOffer * 0.1 || 0);
  const [offer, setOffer] = useState("");

  function handleSubmitBuyNow() {
    // Check if price is valid
    if (price < 1) {
      toast.error("Your offer must be over $1");
      return;
    }

    createBuyOffer(data.id, price);

    toast.success("You have sent your offer to the seller.");

    setIsOpenModal(false);
  }

  function handleSubmitAddBid() {
    // Check if bid is 10% more than current bid
    const tp = data.biddingPrice * 0.1;
    if (bid < data.biddingPrice + tp) {
      toast.error("Your bid must be 10% higher than the current bid!");
      return;
    }

    createBidOffer(data.id, bid);

    toast.success("You have succesfully bidded on the product");

    setIsOpenModal(false);
  }

  function handleSubmitTrade() {
    // Split offer into array
    if (offer.length == 0) {
      toast.error("Please include your offer before submitting.");
      return;
    }

    createTradeOffer(data.id, offer.split(","));

    toast.success("You have sent your offer to the seller.");

    setIsOpenModal(false);
  }

  return (
    <Modal>
      <ModalHeader>
        <FontAwesomeIcon icon={faMessage} />
        <h1>Send Your Offer</h1>
      </ModalHeader>
      <Col jc="space-around" h="100%" padding="0 4rem">
        {type == "Buynow" && (
          <InputDiv>
            <Product>
              <ProductImg src={data.images[0]} />
              <ProductInfo>
                <ProductInfoFirst>
                  <InfoH1>{shortenInfo(data.name)}</InfoH1>
                  <p>{shortenInfo(data.description)}</p>
                </ProductInfoFirst>
                <ProductInfoFirst>
                  <InfoH1>Price:</InfoH1>
                  <p>{convertCurrency(data.price)}</p>
                </ProductInfoFirst>
              </ProductInfo>
            </Product>
            <Col>
              <label htmlFor="offer">Your Offer:</label>
              <Input
                id="offer"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Col>
          </InputDiv>
        )}
        {type == "Auction" && (
          <InputDiv>
            <Product>
              <ProductImg src={data.images[0]} />
              <ProductInfo>
                <ProductInfoFirst>
                  <InfoH1>{shortenInfo(data.name)}</InfoH1>
                  <p>{shortenInfo(data.description)}</p>
                </ProductInfoFirst>
                <ProductInfoFirst>
                  <InfoH1>Current Bid:</InfoH1>
                  <p>{convertCurrency(bidOffer)}</p>
                </ProductInfoFirst>
              </ProductInfo>
            </Product>
            <Col>
              <label htmlFor="bid">
                Your Bid: (Must be higher than or equal to{" "}
                {convertCurrency(bidOffer + bidOffer * 0.1)})
              </label>
              <Input
                id="bid"
                value={bid}
                onChange={(e) => setBid(e.target.value)}
                type="number"
              />
            </Col>
          </InputDiv>
        )}
        {type == "Trade" && (
          <InputDiv>
            <Product>
              <ProductImg src={data.images[0]} />
              <ProductInfo>
                <ProductInfoFirst>
                  <InfoH1>{shortenInfo(data.name)}</InfoH1>
                  <p>{shortenInfo(data.description)}</p>
                </ProductInfoFirst>
              </ProductInfo>
            </Product>
            <Col>
              <h1>Currently Looking For: </h1>
              <UL>
                {data.tradeOffer.map((trade) => {
                  return <li>{trade}</li>;
                })}
              </UL>
            </Col>
            <Col>
              <label htmlFor="trade">
                Your Offer: (Please add a "," or comma after each offer)
              </label>
              <Input
                id="trade"
                type="text"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </Col>
          </InputDiv>
        )}
        <Col>
          {type == "Buynow" && (
            <Button t="accept" onClick={handleSubmitBuyNow}>
              Send Offer
            </Button>
          )}
          {type == "Auction" && (
            <Button t="accept" onClick={handleSubmitAddBid}>
              Send Bid
            </Button>
          )}
          {type == "Trade" && (
            <Button t="accept" onClick={handleSubmitTrade}>
              Send Offer
            </Button>
          )}
          <Button t="decline" onClick={() => setIsOpenModal(false)}>
            Cancel Offer
          </Button>
        </Col>
      </Col>
    </Modal>
  );
}
