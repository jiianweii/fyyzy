import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";

const MiniInfoCardDiv = styled.div`
  display: flex;

  align-items: center;
  background-color: #fff;
  border-radius: 12px;
  padding: 1rem 2rem;
  gap: 1rem;
  @media only screen and (max-width: 425px) {
    padding: 0.25rem;
  }
`;

const MiniInfoCardImg = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 9999px;
  background-color: ${(props) => props.backgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 425px) {
    height: 30px;
    width: 30px;
  }
`;

const MiniInfoCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  height: 40px;

  justify-content: space-between;
  color: #3c3c3c;
  & h1 {
    font-weight: 700;
    @media only screen and (max-width: 425px) {
      font-size: 0.7rem;
    }
  }

  & p {
    font-weight: 500;
    @media only screen and (max-width: 425px) {
      font-size: 0.7rem;
    }
  }

  @media only screen and (max-width: 425px) {
    justify-content: center;
  }
`;

export default function MiniInfoCard({ icon, backgroundColor, type, number }) {
  return (
    <MiniInfoCardDiv>
      <MiniInfoCardImg backgroundColor={backgroundColor}>
        <FontAwesomeIcon icon={icon} color="#fff" fontSize={"1.3rem"} />
      </MiniInfoCardImg>
      <MiniInfoCardInfo>
        <h1>{type}</h1>
        <p>{number}</p>
      </MiniInfoCardInfo>
    </MiniInfoCardDiv>
  );
}
