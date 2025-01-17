import { useQuery } from "@tanstack/react-query";
import { StyledHomePageItemsDiv } from "../../styles/GlobalStyled";
import BuyNowCard from "../cards/BuyNowCard";
import { getProductsByFilter } from "../../services/apiProduct";
import Loader from "../../ui/Loader";
import { convertCurrency, convertDate } from "../helper/helper";
import AuctionProductCard from "../cards/AuctionProductCard";
import TradeCard from "../cards/TradeCard";

export default function MarketListing({
  searchSort,
  value,
  limit,
  type,
  categories,
  category,
  id,
}) {
  const { data, isPending } = useQuery({
    queryKey: ["product", id, category, searchSort, categories, value],
    queryFn: () =>
      getProductsByFilter({
        limit,
        type,
        searchSort,
        category,
        categories,
        value,
        auction_id: id,
      }),
  });

  if (isPending) return <Loader />;

  const products = data?.products;

  if (products?.length == 0) return <div>No Items Found</div>;

  return (
    <StyledHomePageItemsDiv alignment="flex-start" gap="2.4rem">
      {products.map((d) => {
        if (d.type == "Buynow") {
          return (
            <BuyNowCard
              key={d.id}
              id={d.id}
              name={d.name}
              price={convertCurrency(d.price)}
              date={convertDate(d.created_at)}
              images={d.images}
            />
          );
        }
        if (d.type == "Auction") {
          return (
            <AuctionProductCard
              key={d.id}
              id={d.id}
              name={d.name}
              biddingPrice={convertCurrency(d.biddingPrice)}
              date={convertDate(d.created_at)}
              images={d.images}
            />
          );
        }
        if (d.type == "Trade") {
          return (
            <TradeCard
              key={d.id}
              id={d.id}
              name={d.name}
              tradeOffer={d.tradeOffer}
              date={convertDate(d.created_at)}
              images={d.images}
            />
          );
        }
      })}
    </StyledHomePageItemsDiv>
  );
}
