import Link from "next/link";
import { styled } from "styled-components";
import Center from "./Center";
import { useContext } from "react";
import { CartContext } from "./CartContex";
import BarsIcon from "./icons/Bars";

const StyledHeader = styled.header`
  background-color: #222;
`;

const Logo = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

// Wrapper will be used to display our logo and navigation links next to each other.
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

// StyledNav will display our navigation links.
const StyledNav = styled.nav`
  display: block;
  gap: 15px;
  // for mobile devices we change the position to fixed (link will be displayed one under another).
  // Everything will be displayed on top left corner.
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
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
  // We hide it on desktop devices
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href="/">Ecommerce</Logo>
          {/* StyledNav will be visible on desktop devices */}
          <StyledNav>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          {/* NavButton will be visible only on mobile devices */}
          <NavButton>
            <BarsIcon />
          </NavButton>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}
