import styled from "styled-components";

const SecInfoCardDiv = styled.div`
  grid-column-start: ${(props) => props.start};
  grid-column-end: ${(props) => props.end};
  padding: 2rem;
  border-radius: 12px;
  color: #3c3c3c;

  background-color: #fff;
`;

export default function SecInfoCard({ start, end, header }) {
  return (
    <SecInfoCardDiv start={start} end={end}>
      <h1>{header}</h1>
    </SecInfoCardDiv>
  );
}
