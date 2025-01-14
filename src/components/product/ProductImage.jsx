import { useState } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  height: 100%;
  gap: 1rem;
  width: 100%;
`;

const StyledSelectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & div {
    height: 100px;
    width: 100px;
    background-color: #d9d9d9;

    & img {
      height: 100%;
      width: 100%;
      cursor: pointer;
    }
  }
`;

const StyledSelectedDiv = styled.div`
  height: 100%;
  width: 80%;
  background-color: #d9d9d9;

  & img {
    height: 100%;
    width: 100%;
  }
`;

export default function ProductImage({ images }) {
  const [selectedImage, setSelectedImage] = useState("");
  return (
    <StyledDiv>
      <StyledSelectionDiv>
        {images.map((i, n) => {
          return (
            <div key={n} onClick={() => setSelectedImage(i)}>
              {i && <img src={i} />}
            </div>
          );
        })}
      </StyledSelectionDiv>
      <StyledSelectedDiv>
        {images[0] && <img src={selectedImage || images[0]} />}
      </StyledSelectedDiv>
    </StyledDiv>
  );
}
