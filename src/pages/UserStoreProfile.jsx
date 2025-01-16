import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getSellerInfo } from "../services/apiUser";
import { useQuery } from "@tanstack/react-query";
import Loader from "../ui/Loader";

import Products from "../components/sections/Products";
import Table from "../components/user/Table/Table";
import {
  convertDate,
  convertPercent,
  hideEmail,
} from "../components/helper/helper";

const UserProfile = styled.section`
  display: flex;
  justify-content: center;
  padding: 2rem;

  min-height: 100vh;
  width: 100%;
`;

const UserProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #000;
  width: 90%;
`;

const UserProfileDetails = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: ${(props) => props.align};
  background-color: #fff;
  width: ${(props) => props.width};
  padding: 1rem;
`;

const UserProfileProducts = styled.div`
  display: flex;
  flex-direction: column;

  gap: 2rem;
  width: 100%;
`;

const UserProfileRef = styled.div`
  display: flex;

  width: 100%;
  background-color: #fff;
  padding: 1rem;
`;

const UserProfileRefInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  & img {
    height: 50px;
    width: 50px;
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & p {
    font-size: 0.9rem;
  }
`;

const Reviews = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Review = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid #00000025;
`;

const ReviewContent = styled.div`
  display: flex;
  width: ${(props) => props.childWidth || "10rem"};
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

export default function UserStoreProfile() {
  const { userId } = useParams();
  const { data, isPending } = useQuery({
    queryKey: [userId],
    queryFn: () => getSellerInfo(userId),
  });

  if (isPending) return <Loader />;

  const user = data.user[0];
  const products = data.products;
  const reviews = data.reviews;

  return (
    <UserProfile>
      {!data.user.length ? (
        <div>User does not exist</div>
      ) : (
        <UserProfileDiv>
          <UserProfileRef>
            <UserProfileRefInfo>
              <img src={user.image} />
              <Div>
                <Row>
                  <h1>{user.name}</h1>
                  <p>@{user.email}</p>
                </Row>

                <Row>
                  <p>{convertPercent(reviews)} Positive Reviews</p>
                  <p>|</p>
                  <p>{products.length} Products Listed</p>
                  <p>|</p>
                  <p>Joined On {convertDate(user.created_at)}</p>
                </Row>
              </Div>
            </UserProfileRefInfo>
          </UserProfileRef>
          <UserProfileDetails>
            <UserProfileInfo width={"30%"}>
              <h1>About Us</h1>
              <p>{user.bio}</p>
            </UserProfileInfo>
            <UserProfileInfo width={"65%"}>
              <h1>Review ({reviews.length})</h1>

              {reviews.length > 0 ? (
                <Reviews>
                  {reviews.map((review) => {
                    return (
                      <Review>
                        <ReviewContent>
                          {convertDate(review.created_at)}
                        </ReviewContent>
                        <ReviewContent>
                          {hideEmail(review.reviewer_id)}
                        </ReviewContent>
                        <ReviewContent>{review.rating}/5</ReviewContent>
                        <ReviewContent childWidth={"100%"}>
                          {review.content}
                        </ReviewContent>
                      </Review>
                    );
                  })}
                </Reviews>
              ) : (
                <p>{user.name} has no review yet</p>
              )}
            </UserProfileInfo>
          </UserProfileDetails>
          <UserProfileProducts>
            <h1>Listings</h1>
            {products.length > 0 ? (
              <Products id={user.email} />
            ) : (
              <p>{user.name} has no listing yet</p>
            )}
          </UserProfileProducts>
        </UserProfileDiv>
      )}
    </UserProfile>
  );
}
