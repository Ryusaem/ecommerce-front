const { createContext, useState, useEffect } = require("react");

// a context is a way to share data between components
export const CartContext = createContext({});

export function CartContexProvider({ children }) {
  // we need to check if we are in the browser or not and if we are we can use the local storage
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  // we can use this state to store the products in the cart
  const [cartProducts, setCartProducts] = useState([]);

  // we need to check if the cartProducts state has changed and if it has we need to update the local storage. It will refresh the local storage every time the cartProducts state changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // we check if the local storage has a cart and if it does we set the cartProducts state to the local storage cart
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // we can use this function to add a product to the cart
  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  // we can use this function to remove a product from the cart
  function removeProduct(productId) {
    setCartProducts((prev) => {
      // we use indexOf to find the position of the product in the array
      const pos = prev.indexOf(productId);

      // why -1? because if the product is not in the cart the indexOf method will return -1
      if (pos !== -1) {
        // we use filter to remove the product from the array. it will return a new array without the product
        return prev.filter((value, index) => index !== pos);
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }
  return (
    // cartcontext.provider is a component that wraps all the components that need access to the cart
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
