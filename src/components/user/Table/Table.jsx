import styled from "styled-components";

const Table = styled.table`
  border: 1px solid #e5e7eb;
  width: 100%;
  color: #3c3c3c;
  background-color: #ffffff;
  border-radius: 12px;
  border-spacing: 0;
  text-align: left;

  @media only screen and (max-width: 425px) {
    font-size: 0.8rem;
  }
  @media only screen and (max-width: 375px) {
    font-size: 0.7rem;
  }

  & th,
  & td {
    align-items: center;
    padding: 8px 16px;
    @media only screen and (max-width: 425px) {
      padding: 4px 8px;
    }
    @media only screen and (max-width: 375px) {
      padding: 2px 4px;
    }
  }

  & td {
    & div {
      display: flex;
      align-items: center;
      font-weight: 600;
      gap: 1rem;
      @media only screen and (max-width: 425px) {
        gap: 0.5rem;
      }

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
    border-top: 1px solid #00000050;
  }
`;

export default Table;
