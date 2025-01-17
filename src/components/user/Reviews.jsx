import { useState } from "react";
import { Div, H1, Select, Utils } from "../../styles/GlobalStyled";
import ReviewListing from "./Review/ReviewListing";

export default function Reviews() {
  const [sortBy, setSortBy] = useState([]);

  function handleOnChange(e) {
    const val = e.target.value.split(",");

    setSortBy(val);
  }

  return (
    <Div>
      <Utils>
        <H1>All Reviews</H1>
        <Select onChange={(e) => handleOnChange(e)}>
          <option value="created_at,asc">Sort By (Most Recent)</option>
          <option value="rating,desc">Sort By (Highest Ratings)</option>
          <option value="rating,asc">Sort By (Lowest Ratings)</option>
        </Select>
      </Utils>
      <ReviewListing sortBy={sortBy} />
    </Div>
  );
}
