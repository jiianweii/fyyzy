import { Div, H1, Pagination, Select, Utils } from "../../styles/GlobalStyled";
import Table from "./Table/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useModalContext } from "../../Provider/ModalProvider";
import { useQuery } from "@tanstack/react-query";
import { getProductsByCreator } from "../../services/apiProduct";
import { convertCurrency } from "../helper/helper";

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

const TableRow = styled.tr`
  cursor: pointer;
`;

const initialState = {
  name: "A",
  images: [],
  category: "trade",
  description: "aaaaa",
  type_of_product: "",
  looking_for: "",
  auction: "",
  bidding_price: 0,
  price: 0,
};

export default function Products() {
  const { data, isPending } = useQuery({
    queryKey: "userProduct",
    queryFn: getProductsByCreator,
  });
  const { setIsOpenModal, setSelectedProduct } = useModalContext();

  if (isPending) return <div>Loading</div>;

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
          {data.length > 0 && (
            <Select>
              <option value="+date">Sort By (Most Recent)</option>
              <option value="+rating">Sort By (Highest Ratings)</option>
              <option value="-rating">Sort By (Lowest Ratings)</option>
            </Select>
          )}
        </UtilHead>
      </Utils>
      {data.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>DESCRIPTION</th>
                <th>PRICE</th>
                <th>Sold To</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, i) => {
                return (
                  <TableRow
                    onClick={() => {
                      setSelectedProduct(d);
                      setIsOpenModal(true);
                    }}
                  >
                    <td>{i + 1}</td>
                    <td>
                      <div>
                        <img src={d.images[0]} />
                        <p>{d.name}</p>
                      </div>
                    </td>
                    <td>{d.description}</td>
                    <td>
                      {d.price || d.biddingPrice
                        ? convertCurrency(d.price || d.biddingPrice)
                        : "-"}
                    </td>
                    <td>{d.sold_to ? d.sold_to : "Not Sold Yet"}</td>
                  </TableRow>
                );
              })}
            </tbody>
          </Table>
          <Utils>
            <h1>Showing 1 to {data.length} Items</h1>
            <Pagination>
              <button>
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <div>1</div>
              <button>
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </Pagination>
          </Utils>
        </>
      ) : (
        <div>Please add a product to begin</div>
      )}
    </Div>
  );
}
