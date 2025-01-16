import styled from "styled-components";

const SearchModalDiv = styled.div`
  position: absolute;
  left: 0;
  bottom: -200px;
  background-color: #fff;
  padding: 1rem;
  color: #000;
  z-index: 5;

  overflow-y: auto;

  height: 200px;
  width: 145px;
`;

const SearchModalLayout = styled.select`
  display: flex;
  flex-direction: column;
`;

export default function SearchModal({ data, setSearchCategory }) {
  return (
    <SearchModalDiv>
      <SearchModalLayout>
        {data.map((d) => {
          return <option value={d.name}>{d.name}</option>;
        })}
      </SearchModalLayout>
    </SearchModalDiv>
  );
}
