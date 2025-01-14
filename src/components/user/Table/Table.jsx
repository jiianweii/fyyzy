import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #e5e7eb;
  width: 100%;
  color: #3c3c3c;
  background-color: #ffffff;
  border-radius: 12px;
  border-spacing: 0;
  text-align: left;

  & th,
  & td {
    align-items: center;
    padding: 8px 16px;
  }

  & td {
    & div {
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 1rem;

      & img {
        height: 50px;
        width: 50px;
      }
    }
  }

  & th {
    background-color: #e9e9e9;
  }
  & th:first-child {
    border-top-left-radius: 12px;
  }
  & th:last-child {
    border-top-right-radius: 12px;
  }

  & tr:nth-child(even) {
    border-top: 1px solid #e5e7eb;
  }
`;

export default Table;
