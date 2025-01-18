import {
  faBagShopping,
  faBook,
  faMoneyBill1Wave,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import styled from "styled-components";

import MiniInfoCard from "./HomePage/MiniInfoCard";
import SecInfoCard from "./HomePage/SecInfoCard";
import MainInfoCard from "./HomePage/MainInfoCard";
import { Div, H1 } from "../../styles/GlobalStyled";
import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "../../services/apiUser";
import Loader from "../../ui/Loader";
import { convertCurrency, convertDate, convertPercent } from "../helper/helper";
import Table from "./Table/Table";
import Offer from "./HomePage/Offer";
import { useState } from "react";
import { Link } from "react-router-dom";

const InfoCardDiv = styled.div`
  display: grid;
  height: 100%;

  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  grid-template-rows: auto 200px 1fr;

  @media only screen and (max-width: 425px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto 1fr;
    column-gap: 1rem;
  }
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 10px;

  background-color: #e9e9e9;
  color: #3c3c3c;

  cursor: pointer;

  @media only screen and (max-width: 425px) {
    font-size: 0.7rem;
    padding: 0.5rem;
    width: 50px;
  }
`;

const StoreButton = styled(Link)`
  display: block;
  font-size: 1rem;
  padding: 1rem;
  width: 100px;
  border: none;
  border-radius: 10px;
  text-align: center;
  text-decoration: none;

  background-color: #ff0000;
  color: #fff;
`;

const StoreButtonDiv = styled.div`
  display: none;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 425px) {
    display: flex;
  }
`;

export default function Home() {
  const [currentOffer, setCurrentOffer] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["info"],
    queryFn: getUserInfo,
  });

  if (isLoading) return <Loader />;

  let price = 0;

  data?.products.map((d) =>
    d.isSold && d.sold_to ? (price += d.price || d.biddingPrice) : price
  );

  return (
    <Div>
      <StoreButtonDiv>
        <StoreButton to="/">Back To Store</StoreButton>
      </StoreButtonDiv>

      {isOpenModal && (
        <Offer currentOffer={currentOffer} setIsOpenModal={setIsOpenModal} />
      )}
      <H1>Dashboard</H1>
      <InfoCardDiv>
        <MiniInfoCard
          icon={faBagShopping}
          backgroundColor={"#62DEC9"}
          type="PRODUCTS"
          number={data.products.length}
        />
        <MiniInfoCard
          icon={faBook}
          backgroundColor={"#62BDDE"}
          type="REVIEWS"
          number={data.reviews.length}
        />
        <MiniInfoCard
          icon={faMoneyBill1Wave}
          backgroundColor={"#7962DE"}
          type="REVENUE"
          number={price ? convertCurrency(price) : "S$0.00"}
        />
        <MiniInfoCard
          icon={faStar}
          backgroundColor={"#DEBD62"}
          type="RATINGS"
          number={
            data.reviews.length == 0
              ? "No reviews yet "
              : convertPercent(data.reviews)
          }
        />

        <MainInfoCard header="All Trade Offers">
          {data.offers.length > 0 ? (
            <Table>
              <thead>
                <th>DATE CREATED</th>
                <th>TYPE</th>
                <th>PRODUCT</th>
                <th>BUYER</th>
                <th>ACTION</th>
              </thead>
              <tbody>
                {data.offers.map((d) => {
                  const product = data.products.find(
                    (p) => p.id == d.product_id
                  );
                  return (
                    <tr>
                      <td>{convertDate(d.created_at)}</td>
                      <td>
                        {d.buyOffer
                          ? "NORMAL"
                          : d.bidOffer
                          ? "AUCTION WINNER"
                          : "TRADE"}
                      </td>
                      <td>{product.name}</td>
                      <td>{d.offerer_id}</td>
                      <td>
                        <Button
                          onClick={() => {
                            setCurrentOffer({ offer: d, product });
                            setIsOpenModal(true);
                          }}
                        >
                          View Offer
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <p>You have no offers at the moment.</p>
          )}
        </MainInfoCard>
      </InfoCardDiv>
    </Div>
  );
}
