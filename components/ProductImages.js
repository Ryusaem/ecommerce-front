import { useState } from "react";
import { styled } from "styled-components";

// Goal: display the images of the product and allow the user to change the image

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  border: 2px solid #ccc;
  ${(props) =>
    props.active
      ? `border-color: #ccc;`
      : `border-color: transparent; opacity: .8;`}
  height: 40px;
  padding: 2px;
  cursor: pointer;
  border-radius: 5px;
`;

// BigImageWrapper is used to center the image
const BigImageWrapper = styled.div`
  text-align: center;
`;

export default function ProductImages({ images }) {
  // activeImage will store the image that is currently being displayed
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <ImageButtons>
        {images.map((image) => (
          <ImageButton
            key={image}
            active={image === activeImage}
            onClick={() => setActiveImage(image)}
          >
            <Image
              src={image}
              alt=""
            />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
