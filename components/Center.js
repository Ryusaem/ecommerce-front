import styled from "styled-components";

// GOAL: It will center the content in the page

// We use it in Featured (display the featured products on the home page).
// We use it in Header (display the logo + Nav bar +  the cart icon in the header).
// We use it in NewProducts (display the new products on the home page).
// We use it in cart (display the cart items and the form to enter the shipping information).
// We use it in [id].js (display the product details on the individual product page).
// We use it in products.js (display the products on the products page).

const StyledDiv = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

// we can use this component to center the content in the page. For example, we can use it to center the products in the home page
export default function Center({ children }) {
  return <StyledDiv>{children}</StyledDiv>;
}
