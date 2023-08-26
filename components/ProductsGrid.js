import styled from "styled-components";
import ProductBox from "./ProductBox";

// Goal: This component will display a grid of products that we can use on the home page and the products page
// PS: ProductBox goal is to display a single product

const StyledProductsGrid = styled.div`
  display: grid;
  // for mobile devices we have 2 columns
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
          <ProductBox
            key={product._id}
            {...product}
          />
        ))}
    </StyledProductsGrid>
  );
}
