import { CartContext } from "./CartContex";
import BarsIcon from "./icons/Bars";
import Center from "./Center";

import { useContext, useState } from "react";
import Link from "next/link";
import { styled } from "styled-components";

// GOAL: It will display the header of our website. It will contain the logo and the navigation links.

// We use it in cart.js, index.js (home), [id].js (individual product page) & products.js (products page)

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
  // We use position relative and z-index to display our logo on top of the navigation links.
  position: relative;
  z-index: 3;
`;

// Wrapper will be used to display our logo and navigation links next to each other.
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

// StyledNav will display our navigation links.
const StyledNav = styled.nav`
  // We use props.mobileNavActive to display our navigation links on mobile devices.
  ${(props) =>
    props.mobileNavActive
      ? `
  display: block;
  `
      : `
  display: none;`}
  gap: 15px;
  // for mobile devices we change the position to fixed (link will be displayed one under another).
  // Everything will be displayed on top left corner.
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  // for desktop device we change the position to static (link will be displayed next to each other)
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

// NavLink is styling our links
const NavLink = styled(Link)`
  display: block;
  color: #aaa;
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

// NavButton is a button that will be visible only on mobile devices.
// Its our menu button.
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border: 0;
  color: white;
  cursor: pointer;
  // We use position relative and z-index to display our button on top of the navigation links.
  position: relative;
  z-index: 3;
  // We hide it on desktop devices
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  // We use cartProducts to display the number of products in the cart.
  const { cartProducts } = useContext(CartContext);

  // mobileNavActive will be used to display our navigation links on mobile devices. At first it will be false. When we press the menu button it will be true. When we press the menu button again it will be false.
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">Ecommerce</Logo>
          {/* StyledNav will be visible on desktop devices */}
          {/* It will display our navigation links next to each other. */}
          {/* On mobile devices it will be hidden. */}
          {/* it will only be visible when mobileNavActive is true. */}
          <StyledNav mobileNavActive={mobileNavActive}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          {/* NavButton will be visible only on mobile devices */}
          {/* It will act like an hamburger menu when we press the icon. */}
          {/* (prev) => !prev mean that we will change the value of mobileNavActive to the opposite of its current value. */}
          <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
