import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getSellerInfo } from "../../services/apiUser";
import { convertDate, convertPercent } from "../helper/helper";

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

  & img {
    width: 100%;
    height: 100%;
    border-radius: 9999px;
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

export default function SellerInfo({ id }) {
  const { data, isPending } = useQuery({
    queryKey: [id],
    queryFn: () => getSellerInfo(id),
  });

  if (isPending) return <div>Loading</div>;

  console.log(data);

  return (
    <StyledSellerInfoDiv>
      <StyledSellerDiv>
        <StyledSellerImg>
          <img src={data.user[0].image} />
        </StyledSellerImg>
        <StyledSellerInfo>
          <h1>{data.user[0].name}</h1>
          <p>
            {convertPercent(data.reviews)} Positive Reviews |
            {" " + data.products.length + " "}
            Products | Since {convertDate(data.user[0].created_at)}
          </p>
        </StyledSellerInfo>
      </StyledSellerDiv>
      <StyledButton>Visit Seller</StyledButton>
    </StyledSellerInfoDiv>
  );
}
