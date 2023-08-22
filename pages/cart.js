import Button from "@/components/Button";
import { CartContext } from "@/components/CartContex";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Table from "@/components/Table";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  margin-top: 40px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 80px;
    max-height: 80px;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

export default function CartPage() {
  // cartProducts will have only the ids of the products in the cart. We will use this state to make a post request to the api
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);

  // products will have the products from the api
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // we check if the cartProducts state has any products in it and if it does we make a post request to the api
    if (cartProducts.length > 0) {
      // we make a post request to the api and send the cartProducts state as the body
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  // we calculate the total price of the products in the cart
  let total = 0;

  // we loop through the cartProducts state and for each id we find the product in the products state and add the price to the total.
  // productId is the id of the product in the cart
  // cartProducts is the state that has the ids of the products in the cart
  for (const productId of cartProducts) {
    const price =
      products.find((product) => product._id === productId)?.price || 0;
    total += price;
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnWrapper>
          <Box>
            <h2>Cart</h2>

            {/* we verify if the cart is empty */}
            {!cartProducts?.length && <div>You cart is empty</div>}

            {products?.length > 0 && (
              <Table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  {products.map((product) => (
                    <tr>
                      <ProductInfoCell>
                        <ProductImageBox>
                          <img
                            src={product.images[0]}
                            alt=""
                          />
                        </ProductImageBox>

                        {product.title}
                      </ProductInfoCell>
                      <td>
                        <Button onClick={() => lessOfThisProduct(product._id)}>
                          -
                        </Button>
                        <QuantityLabel>
                          {
                            cartProducts.filter((id) => id === product._id)
                              .length
                          }
                        </QuantityLabel>
                        <Button onClick={() => moreOfThisProduct(product._id)}>
                          +
                        </Button>
                      </td>
                      <td>
                        $
                        {cartProducts.filter((id) => id === product._id)
                          .length * product.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td>${total}</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Box>

          {/* we verify if the cart is not empty and if it is not we display the
          order information */}
          {!!cartProducts?.length && (
            <Box>
              <h2>Order Information</h2>
              <input
                type="text"
                placeholder="Address 1"
              />
              <input
                type="text"
                placeholder="Address 2"
              />

              <Button
                black
                block
              >
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumnWrapper>
      </Center>
    </>
  );
}
