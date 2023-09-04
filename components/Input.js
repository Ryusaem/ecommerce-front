import { styled } from "styled-components";

// GOAL: Create a reusable input component. This component should accept all the props that a normal input would accept.

// We use it in the cart.js page to display the form to enter the shipping information

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
