import { useQuery } from "@tanstack/react-query";
import { StyledHomePageItemsDiv } from "../../styles/GlobalStyled";
import BuyNowCard from "../cards/BuyNowCard";
import Loader from "../../ui/Loader";
import { getProductsByCurrentSelection } from "../../services/apiProduct";
import AuctionProductCard from "../cards/AuctionProductCard";
import TradeCard from "../cards/TradeCard";
import { convertCurrency, convertDate } from "../helper/helper";

export default function OtherListing({ seller_id, curr_id }) {
  const { data, isPending } = useQuery({
    queryKey: ["otherProducts"],
    queryFn: () => getProductsByCurrentSelection(curr_id, seller_id),
  });

  if (isPending) return <Loader />;

  return (
    <StyledHomePageItemsDiv alignment="flex-start" width="100%" gap="2.4rem">
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
