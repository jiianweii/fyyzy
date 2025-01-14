import { useQuery } from "@tanstack/react-query";
import { StyledHomePageItemsDiv } from "../../styles/GlobalStyled";
import CategoryCard from "../cards/CategoryCard";
import { getCategory } from "../../services/apiCategory";
import Loader from "../../ui/Loader";

export default function CategoryListing({ limit, width }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["category"],
    queryFn: () => getCategory(limit),
  });

  if (isPending) return <Loader />;

  return (
    <StyledHomePageItemsDiv alignment="flex-start" gap="2.4rem" width={width}>
      {data.map((d) => {
        return (
          <CategoryCard imgsrc={d.image} name={d.name}>
            <h1>{d.name}</h1>
          </CategoryCard>
        );
      })}
    </StyledHomePageItemsDiv>
  );
}
