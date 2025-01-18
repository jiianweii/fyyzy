import { useQuery } from "@tanstack/react-query";
import { StyledHomePageItemsDiv } from "../../styles/GlobalStyled";
import AuctionCard from "../cards/AuctionCard";
import { getAuctions } from "../../services/apiAuction";
import Loader from "../../ui/Loader";
import { compareDate, convertDate } from "../helper/helper";

export default function AuctionListing({ limit }) {
  const { data, isPending, error } = useQuery({
    queryKey: ["auction"],
    queryFn: () => getAuctions(limit),
  });

  if (isPending) return <Loader />;

  if (data.length == 0) return <div>No Auction at the moment</div>;

  return (
    <StyledHomePageItemsDiv alignment="flex-start" gap="2.4rem">
      {data?.map((d) => {
        const isValid = compareDate(d.startDate, d.endDate);
        return (
          <AuctionCard
            id={d.id}
            started={isValid}
            color={
              isValid == "STARTED"
                ? "red"
                : isValid == "NOT STARTED"
                ? "blue"
                : "green"
            }
            status={
              isValid == "STARTED"
                ? "LIVE NOW"
                : isValid == "NOT STARTED"
                ? "COMING SOON"
                : "ENDED"
            }
            name={d.name}
            deadline={
              isValid == "STARTED"
                ? `Ends on ${convertDate(d.endDate)}`
                : isValid == "NOT STARTED"
                ? `Start on ${convertDate(d.startDate)}`
                : `Ended on ${convertDate(d.endDate)}`
            }
          />
        );
      })}
    </StyledHomePageItemsDiv>
  );
}
