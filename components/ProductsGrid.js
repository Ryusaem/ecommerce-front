import styled from "styled-components";
import ProductBox from "./ProductBox";

// Goal: This component will display a grid of products that we can use on the home page and the products page
// PS: ProductBox goal is to display a single product

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
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
