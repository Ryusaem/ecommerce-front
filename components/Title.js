const { styled } = require("styled-components");

// GOAL: create a reusable title component. We can have the same title component on multiple pages.
// We use it in [id].js and products.js pages

const Title = styled.h1`
  font-size: 1.5em;
`;

export default Title;
