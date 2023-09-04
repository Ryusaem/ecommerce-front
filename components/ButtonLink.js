import Link from "next/link";
import { styled } from "styled-components";
import { ButtonStyle } from "./Button";

// GOAL: Create a ButtonLink component that extends the ButtonStyle. It means that the ButtonLink component will have all the styles from ButtonStyle.

// We use it in Featured.js (display the featured products on the home page).

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;

// It will be used like this: <ButtonLink href="/about">About</ButtonLink> in the Header.js component.
export default function ButtonLink(props) {
  return <StyledLink {...props} />;
}
