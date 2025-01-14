import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  height: 150px;
  width: 280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.imgsrc});
  background-size: cover;
  & h1 {
    color: #fff;
  }
`;

export default function CategoryCard({ name, imgsrc, children }) {
  const navigate = useNavigate();
  return (
    <StyledCard
      imgsrc={imgsrc}
      onClick={() => navigate(`/marketplace?category=${name}`)}
    >
      {children}
    </StyledCard>
  );
}
