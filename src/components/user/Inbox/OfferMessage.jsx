import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getOfferByUserId } from "../../../services/apiOffer";
import Loader from "../../../ui/Loader";
import { convertCurrency } from "../../helper/helper";
import toast from "react-hot-toast";
import { completeTransaction } from "../../../services/apiProduct";

const TradeOffer = styled.div`
  display: flex;
  height: 75px;
  justify-content: space-between;
  padding: 0 1.5rem;
  align-items: center;
  background-color: #fff;
`;

const TradeInfo = styled.div`
  display: flex;
  gap: 1rem;
  height: 80%;

  & img {
    height: 100%;
    width: 50px;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #000;
    gap: 0.4rem;

    & h1 {
      font-size: 1rem;
    }
    & p {
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const TradeAction = styled.div`
  display: flex;
  gap: 1rem;
`;

const TradeButton = styled.button`
  padding: 1rem;
  background-color: ${(props) => props.bg};
  color: #fff;
  border: none;
  @media only screen and (max-width: 400px) {
    padding: 1rem;
    font-size: 0.8rem;
    width: 100px;
  }
`;

export default function OfferMessage({
  currentInfo,
  currentUser,
  setIsOpenModal,
}) {
  const { data, isPending } = useQuery({
    queryKey: [currentInfo],
    queryFn: () => getOfferByUserId(currentInfo.offer_id),
  });

  function handleAddReview() {
    setIsOpenModal(true);
  }
  function handleCompleteTrans() {
    completeTransaction(
      currentInfo.products.id,
      currentUser.email,
      currentInfo.offer_id,
      currentInfo.id
    );
    toast.success("Transaction has been completed.");
  }

  if (isPending) return <Loader />;

  return (
    <TradeOffer>
      <TradeInfo>
        <img
          src={
            currentInfo.products.images[0] ||
            "https://mkaqsnyttxfwlrwnoeop.supabase.co/storage/v1/object/public/avatars/profile-default-icon-2048x2045-u3j7s5nj.png"
          }
        />
        <div>
          <h1>{currentInfo.products.name}</h1>
          <p>
            {data.offers.buyOffer
              ? convertCurrency(data.offers.buyOffer)
              : data.offers.bidOffer
              ? convertCurrency(data.offers.bidOffer)
              : data.offers.tradeOffer}
          </p>
        </div>
      </TradeInfo>
      <TradeAction>
        {data.offers.status == "ACCEPTED" &&
          data.email == currentInfo.products.created_by && (
            <TradeButton bg="#4a8ef3" onClick={handleCompleteTrans}>
              COMPLETE TRANSACTION
            </TradeButton>
          )}
        {data.offers.status == "COMPLETED" &&
          data.email != currentInfo.products.created_by && (
            <TradeButton bg="#f55a5a" onClick={handleAddReview}>
              REVIEW
            </TradeButton>
          )}
      </TradeAction>
    </TradeOffer>
  );
}
