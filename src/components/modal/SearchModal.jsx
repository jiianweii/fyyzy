import styled from "styled-components";

const SearchModalDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: -100px;
  background-color: #fff;
  padding: 1rem;
  color: #000;
  z-index: 5;
`;

const SearchModalLayout = styled.div`
  display: flex;
  gap: 1rem;
`;

const SearchModalColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;

  & h1 {
    font-size: 1rem;
  }
`;

const SearchModalFilter = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export default function SearchModal() {
  return (
    <SearchModalDiv>
      <SearchModalLayout>
        <SearchModalColumn>
          <h1>Status</h1>
          <SearchModalFilter>
            <input type="checkbox" id="active" />
            <label htmlFor="active">Active</label>
          </SearchModalFilter>
          <SearchModalFilter>
            <input type="checkbox" id="sold" />
            <label htmlFor="sold">Sold</label>
          </SearchModalFilter>
        </SearchModalColumn>
        <SearchModalColumn>
          <h1>Types</h1>
          <SearchModalFilter>
            <input type="checkbox" id="Auction" />
            <label htmlFor="Auction">Auction</label>
          </SearchModalFilter>
          <SearchModalFilter>
            <input type="checkbox" id="Trade" />
            <label htmlFor="Trade">Trade</label>
          </SearchModalFilter>
          <SearchModalFilter>
            <input type="checkbox" id="Buynow" />
            <label htmlFor="Buynow">Buynow</label>
          </SearchModalFilter>
        </SearchModalColumn>
      </SearchModalLayout>
    </SearchModalDiv>
  );
}
