import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import styled from "styled-components";
import SearchModal from "../modal/SearchModal";

const StyledSearchBarDiv = styled.div`
  height: 40px;
  width: 80%;
  display: flex;
`;

const StyledDropDownBtn = styled.button`
  background-color: var(--btn-color);
  border: none;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  color: var(--secondary-color);
  height: 100%;
  width: 170px;

  font-weight: 300;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  position: relative;
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

const ToSearch = {
  input: "",
  types: [],
  categories: [],
};

export default function Searchbar() {
  const [searchCategory, setSearchCategory] = useState(ToSearch);
  const [isSearchModal, setIsSearchModal] = useState(false);
  return (
    <StyledSearchBarDiv>
      <StyledDropDownBtn onClick={() => setIsSearchModal(!isSearchModal)}>
        All Categories{" "}
        <FontAwesomeIcon icon={isSearchModal ? faChevronUp : faChevronDown} />
        {isSearchModal && <SearchModal />}
      </StyledDropDownBtn>
      <StyledSearchBar type="text" placeholder="Search for anything here" />
      <StyledSearchBtn>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </StyledSearchBtn>
    </StyledSearchBarDiv>
  );
}
