import { Div, H1, Select, Utils } from "../../styles/GlobalStyled";

import styled from "styled-components";
import { useModalContext } from "../../Provider/ModalProvider";

import { useState } from "react";
import ProductListing from "./Products/ProductListing";

const UtilHead = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CreateButton = styled.button`
  padding: 1rem;
  border: none;
  border-radius: 12px;
  background-color: #fff;
  font-weight: 500;
`;

// const initialState = {
//   name: "A",
//   images: [],
//   category: "trade",
//   description: "aaaaa",
//   type_of_product: "",
//   looking_for: "",
//   auction: "",
//   bidding_price: 0,
//   price: 0,
// };

export default function Products() {
  const [sortBy, setSortBy] = useState(["created_at", "asc"]);
  const { setIsOpenModal, setSelectedProduct } = useModalContext();

  function handleOnChangeSelect(e) {
    const val = e.target.value.split(",");
    setSortBy(val);
  }

  return (
    <Div>
      <Utils>
        <H1>All Products</H1>

        <UtilHead>
          <CreateButton
            onClick={(e) => {
              e.preventDefault();
              setIsOpenModal(true);
            }}
          >
            Add New Product
          </CreateButton>
          <Select onChange={(e) => handleOnChangeSelect(e)}>
            <option value="created_at,asc">Sort By (Newest)</option>
            <option value="created_at,desc">Sort By (Oldest)</option>
          </Select>
        </UtilHead>
      </Utils>

      <ProductListing
        sortBy={sortBy}
        setIsOpenModal={setIsOpenModal}
        setSelectedProduct={setSelectedProduct}
      />
    </Div>
  );
}
