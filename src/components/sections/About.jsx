import styled from "styled-components";

export const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  width: 100%;
`;

export const AboutMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #4a8ef3;
  color: #fff;
  height: 200px;
  & h1 {
    font-size: 3rem;
  }
`;

export const AboutInfo = styled.div`
  display: flex;
  flex-direction: column;

  padding: 2rem 0;
  gap: 4rem;
  background-color: #fff;
  align-items: center;
  min-height: 100vh;
`;

export const AboutStuffs = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => props.align};
  text-align: ${(props) => props.align};

  width: 80%;
  gap: 1rem;
  line-height: 1.5rem;

  & h1 {
    font-size: 2rem;
  }

  & ul {
    padding-left: 20px;
  }
`;

export const AboutTeam = styled.div`
  display: flex;
  column-gap: 2rem;
  row-gap: 1rem;
  width: 60%;
  flex-wrap: wrap;
`;
