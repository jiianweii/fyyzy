import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";

import { useQuery } from "@tanstack/react-query";
import { getCategory } from "../../services/apiCategory";
import Loader from "../../ui/Loader";
import { useNavigate } from "react-router-dom";

const StyledSearchBarDiv = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
  position: relative;
`;

const StyledDropDownBtn = styled.button`
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
  justify-content: space-around;
  align-items: center;

  & div {
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

const SearchDropDown = styled.div`
  height: 164px;
  width: 200px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  bottom: -164px;
  left: 0;

  overflow-y: auto;

  & div {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.9rem;
  }

  & div:hover {
    background-color: var(--btn-color);
    color: #fff;
  }

  z-index: 10;
`;

export default function Searchbar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchCategory, setSearchCategory] = useState("All Categories");
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  function handleOnChangeDropDown(name) {
    setIsOpenModal(false);
    setSearchCategory(name);
  }
  function handleSearch() {
    if (!searchValue) return;
    navigate(`/marketplace?category=${searchCategory}&value=${searchValue}`);
  }

  if (isPending) return <Loader />;

  return (
    <StyledSearchBarDiv>
      <StyledDropDownBtn onClick={() => setIsOpenModal(!isOpenModal)}>
        {searchCategory}
        <FontAwesomeIcon icon={isOpenModal ? faChevronUp : faChevronDown} />
      </StyledDropDownBtn>
      {isOpenModal && (
        <SearchDropDown>
          <div onClick={() => handleOnChangeDropDown("All Categories")}>
            All Categories
          </div>
          {data.map((d) => {
            return (
              <div onClick={() => handleOnChangeDropDown(d.name)}>{d.name}</div>
            );
          })}
        </SearchDropDown>
      )}

      <StyledSearchBar
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="Search for anything here"
      />
      <StyledSearchBtn onClick={handleSearch}>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </StyledSearchBtn>
    </StyledSearchBarDiv>
  );
}
