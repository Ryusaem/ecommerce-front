import ProductBox from "./ProductBox";

import styled from "styled-components";

// Goal: This component will display a grid of products that we can use on the home page and the products page. It is the parent of "ProductBox" component.
// PS: ProductBox goal is to display a single product
// We use it in the NewProducts (home) and products.js (home) pages

// It's a grid of products, so we need to use CSS grid to display the products in a grid
const StyledProductsGrid = styled.div`
  // mobile first
  display: grid;
  // we have 2 columns for mobile devices
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  // for desktop devices we change the grid-template-columns to 4 columns
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products?.length > 0 &&
        products.map((product) => (
          // by writing {...product} we pass all the props (product._id, product.title, product.description, product.price, product.images) of each product to the "ProductBox" component
          <ProductBox
            key={product._id}
            {...product}
          />
        ))}
    </StyledProductsGrid>
  );
}
