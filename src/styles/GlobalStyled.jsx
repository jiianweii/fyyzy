import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bg || "#fff"};
  width: 100%;

  position: relative;
`;

export const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  width: 80%;
`;

export const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  height: 100%;
  width: 80%;
`;

export const StyledHomePageItemsDiv = styled.div`
  display: flex;
  justify-content: ${(props) => props.alignment || "space-between"};
  gap: ${(props) => props.gap};
  flex-wrap: wrap;
  align-items: center;
  width: ${(props) => props.width || "80%"};

  @media only screen and (max-width: 425px) {
    width: 100%;
    justify-content: center;
  }
`;

export const StyledHomePageItems = styled.div`
  display: flex;
  justify-content: ${(props) => props.alignment || "space-between"};
  gap: ${(props) => props.gap};
  flex-wrap: wrap;
  align-items: center;
  width: ${(props) => props.width || "80%"};

  @media only screen and (max-width: 425px) {
    width: 90%;
    justify-content: space-between;
  }
`;

export const StyledLink = styled(Link)`
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 0.5rem;
`;

export const StyledMiniLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  & a {
    color: #585858;
    text-decoration: none;
    font-weight: 500;
  }
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 6rem;
  height: 90%;
  width: 80%;

  gap: 2rem;

  color: #fff;

  @media only screen and (max-width: 425px) {
    width: 100%;
    padding: 1rem;
  }
`;

export const H1 = styled.h1`
  font-size: 2.5rem;
  @media only screen and (max-width: 425px) {
    font-size: 1.5rem;
  }
`;

export const Select = styled.select`
  padding: 1rem;
  border-radius: 12px;
  outline: none;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 0.5rem;
  & button {
    padding: 0.5rem;
    border: none;
  }
  & div {
    padding: 0.5rem;
    background-color: #fff;
    color: #000;
  }
`;

export const Utils = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.button`
  color: #3c3c3c;
  background: none;
  font-size: 1.5rem;
  padding: 1rem;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }

  transition: all 0.3s ease;
`;
