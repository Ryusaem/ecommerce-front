const { styled } = require("styled-components");

// GOAL: create a reusable white box component. We can have the same white box component on multiple pages.
// We use it in [id].js pages (Individual product page).
// We use ti to display the product details (title, description, price, images)

const WhiteBox = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

export default WhiteBox;
