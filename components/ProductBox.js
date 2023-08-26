import { styled } from "styled-components";
import Button from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContex";

const ProductWrapper = styled.div``;

// styled components allows us to create a component that is styled
const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  // for mobile devices we display the price and the button on different rows)
  display: block;
  // for desktop devices we change the display to flex so that the price and the button are on the same row
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  // for desktop devices we align the text to the left
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    text-align: left;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  // we can use the addProduct function from the cart context to add a product to the cart
  const { addProduct } = useContext(CartContext);

  // we can use the _id to create a url for the product
  const url = "/product/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img
            // we use ? to make sure that the images array is not empty
            src={images?.[0]}
            alt=""
          />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button
            block
            primary
            outline
            onClick={() => addProduct(_id)}
          >
            Add to cart
          </Button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
