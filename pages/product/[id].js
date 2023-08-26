import Button from "@/components/Button";
import { CartContext } from "@/components/CartContex";
import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductImages from "@/components/ProductImages";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";

// CartIcon is an SVG icon (the cart icon)
import CartIcon from "@/components/icons/CartIcon";
import { mongooseConnect } from "@/lib/mongoose";

// Models are like tables in the database.
import { Product } from "@/models/Product";
import { useContext } from "react";
import { styled } from "styled-components";

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.8fr 1.2fr;
  }
  gap: 40px;
  margin-top: 40px 0;
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.span`
  font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
  // we get the addProduct function from the CartContext.
  // CartContext contains the cart state and the addProduct function.
  // A context is like session from PHP. It is a global variable that can be accessed from anywhere.
  const { addProduct } = useContext(CartContext);

  return (
    <>
      <Header />
      <Center>
        <ColWrapper>
          <WhiteBox>
            <ProductImages images={product.images} />
          </WhiteBox>
          <div>
            <Title>{product.title}</Title>
            <p>{product.description}</p>
            <PriceRow>
              <div>
                <Price>${product.price}</Price>
              </div>
              <div>
                {/* we call the addProduct function when the button is clicked */}
                <Button
                  primary
                  onClick={() => addProduct(product._id)}
                >
                  <CartIcon />
                  Add to cart
                </Button>
              </div>
            </PriceRow>
          </div>
        </ColWrapper>
      </Center>
    </>
  );
}
// getServerSideProps goal is to get the product data from the database
// "context" contains the route parameters for this file (id).
export async function getServerSideProps(context) {
  await mongooseConnect();

  // context.query contains the route parameters for this file (id).
  const { id } = context.query;

  // we get the product data from the database
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
