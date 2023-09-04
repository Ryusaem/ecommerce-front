import { styled } from "styled-components";

// GOAL: create a reusable table component.
// This is a child of the cart.js page.
// We use it on cart.js page to display the cart items.

const StyledTable = styled.table`
  // we set the width of the table to 100% so it takes up the full width of the parent
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #ccc;
    font-weight: 600;
    font-size: 0.7rem;
  }
  // we add a border to the top of each row
  td {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

// {...props} is a spread operator that passes all props to the component
export default function Table(props) {
  return <StyledTable {...props} />;
}
