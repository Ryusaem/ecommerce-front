import styled, { css } from "styled-components";
// {primary} contain the color hex code
import { primary } from "@/lib/colors";

// GOAL: Create a reusable button component that can be used throughout the app

// We use it in ButtonLink (create a button that is a link).
// We use it in Featured (display the featured products on the home page).
// We use it on ProductBox (display the product details on the home page).
// We use it in Cart (display the checkout button).
// We use it in [id].js (display the add to cart button).

export const ButtonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  svg {
    height: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      color: #000;
      border: 1px solid #000;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      border: 1px solid ${primary};
      color: #fff;
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid ${primary};
      color: ${primary};
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 20px;
      svg {
        height: 20px;
      }
    `}
`;

// Create a styled component that extends the ButtonStyle. It means that the Button component will have all the styles from ButtonStyle.
const StyledButton = styled.button`
  ${ButtonStyle}
`;

// Create a Button component that will take the children and rest of the props. For example, children can be "Click me" and rest of the props can be onClick, type, etc.
export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}
