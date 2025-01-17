import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCategory } from "../services/apiCategory";
import Loader from "../ui/Loader";
import { useSearchParams } from "react-router-dom";

const StyledH1 = styled.h1`
  font-weight: 500;
  font-size: 1.2rem;
`;

const StyledMain = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  padding: 1rem 0;
`;

const StyledSidebar = styled.aside`
  display: flex;
  justify-content: flex-end;
  width: 25%;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #00000025;
  padding: 1rem 0;
  gap: 0.5rem;
  width: 100%;
`;

const StyledCheckBoxDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function Sidebar({ setSearchCategories }) {
  const { data, isPending } = useQuery({
    queryKey: ["category"],
    queryFn: getCategory,
  });

  const [searchParams, setSearchParams] = useSearchParams();

  function addOrRemoveItems(name) {
    setSearchCategories((prev) => {
      if (prev.includes(name)) {
        return prev.filter((p) => p != name);
      }

      return [...prev, name];
    });
  }

  if (isPending) return <Loader />;

  return (
    <StyledSidebar>
      <StyledMain>
        <StyledH1>Filter</StyledH1>
        {!searchParams.get("category") && (
          <StyledDiv>
            <StyledH1>Categories</StyledH1>
            {data.map((d) => {
              return (
                <StyledCheckBoxDiv>
                  <input
                    type="checkbox"
                    onClick={() => addOrRemoveItems(d.name)}
                    id={d.name}
                  />
                  <label htmlFor={d.name}>{d.name}</label>
                </StyledCheckBoxDiv>
              );
            })}
          </StyledDiv>
        )}
      </StyledMain>
    </StyledSidebar>
  );
}
