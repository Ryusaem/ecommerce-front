import Center from "./Center";
// ProductsGrid display a grid of products that we can use on the home page and the products page
import ProductsGrid from "./ProductsGrid";

import { styled } from "styled-components";

// GOAL: This component will display the new products on the home page (limited to 10 products).
// We got the "products" props from the database in the pages/index.js file (home) and we passed them as props to this component.
// We use it in the pages/index.js (home) page

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 500;
`;

export default function NewProducts({ products }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      {/* We pass the products props to the ProductsGrid component to display the products */}
      <ProductsGrid products={products} />
    </Center>
  );
}
