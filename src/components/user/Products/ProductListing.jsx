import { useQuery } from "@tanstack/react-query";
import Table from "../Table/Table";
import Loader from "../../../ui/Loader";
import { convertCurrency } from "../../helper/helper";
import { Pagination, Utils } from "../../../styles/GlobalStyled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { getProductsByCreator } from "../../../services/apiProduct";

const TableRow = styled.tr`
  cursor: pointer;
`;

export default function ProductListing({
  sortBy,
  setSelectedProduct,
  setIsOpenModal,
}) {
  const { data, isPending } = useQuery({
    queryKey: ["userProducts", sortBy],
    queryFn: () => getProductsByCreator(sortBy),
  });

  if (isPending) return <Loader />;

  if (data.length == 0) return <div>Please add a product to begin</div>;

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>S/N</th>
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
                key={i}
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
  );
}
