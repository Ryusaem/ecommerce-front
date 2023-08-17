const { createContext, useState, useEffect } = require("react");

// a context is a way to share data between components
export const CartContext = createContext({});

export function CartContexProvider({ children }) {
  // we can use this state to store the products in the cart
  const [cartProducts, setCartProducts] = useState([
    JSON.parse(localStorage.getItem("cart")) || [],
  ]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // we can use this function to add a product to the cart
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }
  return (
    // cartcontext.provider is a component that wraps all the components that need access to the cart
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct }}>
      {children}
    </CartContext.Provider>
  );
}
