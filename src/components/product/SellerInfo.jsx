import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledSellerInfoDiv = styled.div`
  display: flex;
  height: 100px;
  gap: 1rem;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const StyledSellerDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledSellerImg = styled.div`
  width: 35px;
  height: 35px;

  & div {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
    background-color: #2c2c2c;
  }
`;

const StyledSellerInfo = styled.div`
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 1.2rem;
  }

  & p {
    font-size: 0.9rem;
  }
`;

const StyledButton = styled(Link)`
  padding: 1rem 1.5rem;
  background-color: #4a8ef3;
  text-decoration: none;
  color: #fff;
`;

export default function SellerInfo() {
  return (
    <StyledSellerInfoDiv>
      <StyledSellerDiv>
        <StyledSellerImg>
          <div></div>
        </StyledSellerImg>
        <StyledSellerInfo>
          <h1>JohnSellsCard</h1>
          <p>
            95.8% Positive Reviews | 64 Followers | 12 Products | Since 2023
          </p>
        </StyledSellerInfo>
      </StyledSellerDiv>
      <StyledButton>Visit Seller</StyledButton>
    </StyledSellerInfoDiv>
  );
}
