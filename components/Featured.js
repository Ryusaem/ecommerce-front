import { styled } from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContex";

// GOAL: This component will display a featured product on the home page.

// We use it in the pages/index.js (home) page

const Bg = styled.div`
  background-color: #222;
  color: #fff;
  padding: 50px 0;
`;
const Title = styled.h1`
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const Desc = styled.p`
  color: #aaa;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    // max-width allows the image to be responsive
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  // image will be on the top on mobile devices
  div:nth-child(1) {
    order: 2;
  }
  // for desktop devices we change the grid-template-columns to 2 columns
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    // image will be on the right side for desktop devices
    div:nth-child(1) {
      order: 0;
    }
    img {
      // max-width allows the image to be responsive
      max-width: 100%;
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;

const Column = styled.div`
  display: flex;
  align-items: center;
`;

// we can use this component to display a featured product in the home page
export default function Featured({ product }) {
  // we deconstruct the addProduct function from the CartContext component
  const { addProduct } = useContext(CartContext);

  // we use this function to add the featured product to the cart when the user clicks on the add to cart button
  function addFeaturedToCart() {
    addProduct(product._id);
  }

  return (
    <Bg>
      <Center>
        <ColumnWrapper>
          <Column>
            <div>
              <Title>{product.title}</Title>
              <Desc>{product.description}</Desc>
              <ButtonsWrapper>
                {/* we use the ButtonLink component to create a button that links to the product page. When a client clicks on the button it will redirect to the product page. */}
                <ButtonLink
                  href={"/product/" + product._id}
                  white={1}
                  outline={1}
                >
                  Read more
                </ButtonLink>
                {/* we use the Button component to create a button that adds the featured product to the cart. When a client clicks on the button it will add the product to the cart. */}
                <Button
                  white
                  onClick={addFeaturedToCart}
                >
                  {/* we use the CartIcon component to display a cart icon in the button */}
                  <CartIcon />
                  Add to cart
                </Button>
              </ButtonsWrapper>
            </div>
          </Column>

          {/* This is the featured product and we can use it to display a featured product in the home page */}
          <Column>
            <img src="https://ryusaem-next-ecommerce.s3.amazonaws.com/1689971782705.jpg" />
          </Column>
        </ColumnWrapper>
      </Center>
    </Bg>
  );
}
