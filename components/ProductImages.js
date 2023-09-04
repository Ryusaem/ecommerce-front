import { useState } from "react";
import { styled } from "styled-components";

// GOAL: display the images of the product when a user click on a specific product and allow the user to change the image. It is the child of the component pages/product/[id].js

// We use it in the pages/product/[id].js file (individual product page)

// BigImageWrapper → BigImage
// ImageButtons → ImageButton → Image

// BigImageWrapper is used to center the image
const BigImageWrapper = styled.div`
  text-align: center;
`;

// BigImage is the image that is currently being displayed
const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
`;

// ImageButtons is a container for the images
const ImageButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

// ImageButton will contain all the images available for the product which includes the image that is currently being displayed and the images that are not currently being displayed. When a user clicks on an image, the image will be displayed in the BigImage component.
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

// Image is the image that is not currently being displayed
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
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
        {/* "images" contains all the images available for the product which includes the image that is currently being displayed and the images that are not currently being displayed. */}
        {images.map((image) => (
          // when a user clicks on an image, the image will be displayed in the BigImage component by setting the activeImage state to the image that the user clicked on.
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
