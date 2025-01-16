import { useQuery } from "@tanstack/react-query";
import { StyledHomePageItemsDiv } from "../../styles/GlobalStyled";
import BuyNowCard from "../cards/BuyNowCard";
import Loader from "../../ui/Loader";
import { convertCurrency, convertDate } from "../helper/helper";
import AuctionProductCard from "../cards/AuctionProductCard";
import TradeCard from "../cards/TradeCard";
import { getProductsByCurrentSelection } from "../../services/apiProduct";

export default function Products({ id }) {
  const { data, isPending } = useQuery({
    queryKey: ["seller_products"],
    queryFn: () => getProductsByCurrentSelection(0, id),
  });

  if (isPending) return <Loader />;
  if (data.length == 0) return <div>No Items Found</div>;

  return (
    <StyledHomePageItemsDiv alignment="flex-start" gap="2.4rem">
      {data.map((d) => {
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
