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

const InfoCardDiv = styled.div`
  display: grid;
  height: 100%;

  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  grid-template-rows: auto 200px 1fr;
`;

const Button = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 10px;

  background-color: #e9e9e9;
  color: #3c3c3c;

  cursor: pointer;
`;

export default function Home() {
  const [currentOffer, setCurrentOffer] = useState({});
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data, isPending } = useQuery({
    queryKey: ["info"],
    queryFn: getUserInfo,
  });

  if (isPending) return <Loader />;

  let price = 0;

  data.products.map((d) =>
    d.isSold && d.sold_to ? (price += d.price || d.biddingPrice) : price
  );

  return (
    <Div>
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
              : convertPercent(data.reviews) + " Positive Reviews "
          }
        />
        {/* <SecInfoCard start={1} end={3} header="Recent Products" />
        <SecInfoCard start={3} end={-1} header="Recent Reviews" /> */}
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
