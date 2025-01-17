import styled from "styled-components";

const MainInfoCardDiv = styled.div`
  grid-row-start: 2;
  grid-row-end: -1;
  grid-column-start: 1;
  grid-column-end: -1;

  border-radius: 12px;
  color: #3c3c3c;
  background-color: #fff;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media only screen and (max-width: 425px) {
    grid-row-start: 2;
    grid-row-end: -1;
    grid-column-start: 1;
    grid-column-end: -1;
  }
`;

export default function MainInfoCard({ header, children }) {
  return (
    <MainInfoCardDiv>
      <h1>{header}</h1>
      {children}
    </MainInfoCardDiv>
  );
}
