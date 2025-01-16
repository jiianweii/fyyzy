import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategory";
import Loader from "../../ui/Loader";

const StyledSearchBarDiv = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
  position: relative;
`;

const StyledDropDownBtn = styled.select`
  background-color: var(--btn-color);
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: var(--secondary-color);
  height: 100%;
  width: 170px;
  padding: 0 1rem;

  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;

  & option {
    background-color: #fff;
    color: #000;
  }
`;

const StyledSearchBar = styled.input`
  padding: 5px 10px;
  width: 100%;
  height: 100%;
  border: 1px solid var(--btn-color);
  &:focus {
    outline: none;
  }
`;

const StyledSearchBtn = styled.button`
  background-color: var(--btn-color);
  border: none;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  color: var(--secondary-color);
  height: 100%;
  width: 50px;

  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Searchbar() {
  const [searchCategory, setSearchCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  function handleSearch() {}

  if (isPending) return <Loader />;

  return (
    <StyledSearchBarDiv>
      <StyledDropDownBtn onChange={(e) => setSearchCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {data.map((d) => {
          return <option value={d.name}>{d.name}</option>;
        })}
      </StyledDropDownBtn>

      <StyledSearchBar
        type="text"
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for anything here"
      />
      <StyledSearchBtn onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </StyledSearchBtn>
    </StyledSearchBarDiv>
  );
}
