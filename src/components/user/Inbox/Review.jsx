import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import toast from "react-hot-toast";
import styled from "styled-components";
import { addReview } from "../../../services/apiReview";

const FullScreen = styled.div`
  width: 100%;
  height: 100%;

  position: absolute;
  top: 0;
  left: 0;

  background-color: #00000080;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const ReviewDiv = styled.div`
  width: 400px;
  background-color: #fff;

  display: flex;
  flex-direction: column;
`;

const ReviewHeader = styled.div`
  display: flex;
  padding: 2rem;

  align-items: center;
  background-color: #526e97;
  color: #fff;

  & h1 {
    font-size: 1.7rem;
  }
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  color: #526e97;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StarRating = styled(FontAwesomeIcon)`
  font-size: 1.5rem;
  ${(props) => (props.selected == true ? "color: yellow" : "color: #000")}
`;

const TextArea = styled.textarea`
  resize: none;
  height: 100px;
  padding: 1rem;
`;

const ReviewButton = styled.button`
  padding: 1rem;
  background-color: #f55a5a;
  color: #fff;
  border: none;
`;

export default function Review({
  setIsOpenModal,
  seller_id,
  chatId,
  handleClearChat,
}) {
  const [remarks, setRemarks] = useState("");
  const [ratingCount, setRatingCount] = useState(0);
  const rating = ["Terrible", "Poor", "Average", "Good", "Excellent"];
  function handleExit(e) {
    if (e.target.id == "fullscreen") setIsOpenModal(false);
  }
  function handleSubmit() {
    if (ratingCount == 0) {
      toast.error("Please select your rating");
      return;
    }

    addReview(seller_id, ratingCount, remarks, chatId);
    toast.success("You have submitted your ratings!");

    setIsOpenModal(false);
    handleClearChat();
  }

  return (
    <FullScreen id="fullscreen" onClick={handleExit}>
      <ReviewDiv>
        <ReviewHeader>
          <h1>Write A Review</h1>
        </ReviewHeader>
        <ReviewContent>
          <Column>
            <h1>Select Rating</h1>
            <Row>
              {rating.map((_, i) => {
                return (
                  <StarRating
                    icon={faStar}
                    selected={i < ratingCount}
                    onClick={() => setRatingCount(i + 1)}
                  />
                );
              })}
              {rating[ratingCount - 1]}
            </Row>
          </Column>
          <TextArea
            placeholder="Add Your Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
          <ReviewButton onClick={handleSubmit}>Submit Review</ReviewButton>
        </ReviewContent>
      </ReviewDiv>
    </FullScreen>
  );
}
