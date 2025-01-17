import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;

  color: #000;

  width: 280px;
`;

const StyledCardImgDiv = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    height: 100%;
    width: 100%;
  }
`;

const StyledCardMainDiv = styled.div`
  box-shadow: 0 -2px 0 #00000050;
  padding: 1rem 0;
  gap: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const StyledCardMainHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & h1 {
    font-weight: 700;
    font-size: 2rem;
  }
`;

const StyledCardBtmHeader = styled.div`
  display: flex;

  & p {
    font-weight: 300;
    font-size: 0.9rem;
  }
`;

export default function TeamCard({ image, name, position, description }) {
  return (
    <StyledCard>
      <StyledCardImgDiv>
        <img src={image} />
      </StyledCardImgDiv>
      <StyledCardMainDiv>
        <StyledCardMainHeader>
          <h1>{name}</h1>
        </StyledCardMainHeader>
        <StyledCardBtmHeader>
          <p>{position}</p>
        </StyledCardBtmHeader>
      </StyledCardMainDiv>
    </StyledCard>
  );
}
