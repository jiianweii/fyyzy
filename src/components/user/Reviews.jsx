import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Div,
  H1,
  Pagination,
  Select,
  Utils,
} from "../../styles/GlobalStyled";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Table from "./Table/Table";
import { useQuery } from "@tanstack/react-query";
import { getReviews } from "../../services/apiReview";
import Loader from "../../ui/Loader";
import { convertDate } from "../helper/helper";

export default function Reviews() {
  const rating = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  const { data, isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });

  if (isPending) return <Loader />;

  return (
    <Div>
      <Utils>
        <H1>All Reviews</H1>

        {data.length > 0 && (
          <Select>
            <option value="+date">Sort By (Most Recent)</option>
            <option value="+rating">Sort By (Highest Ratings)</option>
            <option value="-rating">Sort By (Lowest Ratings)</option>
          </Select>
        )}
      </Utils>
      {data.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <th>S/N</th>
              <th>DATE</th>
              <th>BUYER</th>
              <th>RATING</th>
              <th>REVIEW</th>
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => {
              return (
                <tr>
                  <td>{i + 1}</td>
                  <td>{convertDate(d.created_at)}</td>
                  <td>
                    <div>
                      <p>{d.reviewer_id}</p>
                    </div>
                  </td>
                  <td>{rating[d.rating - 1]}</td>
                  <td>{d.content}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>You have no reviews at the moment</div>
      )}
      {data.length > 0 && (
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
      )}
    </Div>
  );
}
