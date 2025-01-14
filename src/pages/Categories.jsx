import styled from "styled-components";
import CategoryListing from "../components/sections/CategoryListing";

const CatH1 = styled.h1`
  font-size: 2rem;
  color: #000;
`;

const CatSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem 0;

  width: 100%;
  height: 100vh;
`;

const CatDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export default function Categories() {
  return (
    <CatSection>
      <CatDiv>
        <CatH1>All Categories</CatH1>
        <CategoryListing width={"100%"} />
      </CatDiv>
    </CatSection>
  );
}
