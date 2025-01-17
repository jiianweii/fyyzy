import { useQuery } from "@tanstack/react-query";
import { convertDate } from "../../helper/helper";
import Table from "../Table/Table";
import { getReviews } from "../../../services/apiReview";
import Loader from "../../../ui/Loader";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination, Utils } from "../../../styles/GlobalStyled";

export default function ReviewListing({ sortBy }) {
  const rating = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  const { data, isPending } = useQuery({
    queryKey: ["reviews", sortBy],
    queryFn: () => getReviews(sortBy),
  });

  if (isPending) return <Loader />;
  if (data.length == 0) return <div>You have no reviews at the moment</div>;
  return (
    <>
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
