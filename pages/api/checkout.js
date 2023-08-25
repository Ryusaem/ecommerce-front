import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
// stripe is a library that allows us to interact with the stripe api
const stripe = require("stripe")(process.env.STRIPE_SK);

export default async function handler(req, res) {
  // we verify if the request is a post request
  if (req.method !== "POST") {
    res.json("should be a post request");
    return;
  }

  // we destructure the body of the request and get the name, email, city, postalCode, streetAddress, country and products
  const {
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    cartProducts,
  } = req.body;

  // we connect to the database
  await mongooseConnect();

  // we split the products string into an array of ids because the products string is a string of ids separated by a comma
  const productIds = cartProducts;

  // we remove the duplicates from the array of ids because we don't want to charge the customer twice for the same product
  const uniqueIds = [...new Set(productIds)];

  // we find the products in the database with the ids in the uniqueIds array and we store them in the productsInfos array
  const productsInfos = await Product.find({ _id: uniqueIds });

  // line_items is an array of objects with the quantity, price_data (currency, unit amount and product_data (name)
  let line_items = [];

  // we loop through the unique ids and find the product info (title and price) and the quantity of each product (the number of times the id appears in the productIds array.

  for (const productId of uniqueIds) {
    // we verify if the product exists in the productsInfos array because if the product doesn't exist in the productsInfos array, it means that the product doesn't exist in the database.
    const productInfo = productsInfos.find(
      (product) => product._id.toString() === productId
    );

    // to get the quantity of each product, we filter the productIds array and we get the number of times the id appears in the array.
    const quantity = productIds.filter((id) => id === productId).length || 0;

    // we verify if the quantity is greater than 0 and if the productInfo exists. Remember, the productInfo is the product info (title and price) of the product with the id productId.
    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: productInfo.title },
          // we multiply the quantity by the price of the product and by 100 because the price is in cents and not in dollars.
          unit_amount: quantity * productInfo.price * 100,
        },
      });
    }
  }

  // we create an order in the database with the line_item (the products) + info of the customer (name, etc)
  const orderDoc = await Order.create({
    line_items,
    name,
    email,
    city,
    postalCode,
    streetAddress,
    country,
    paid: false,
  });

  // we create a session with the line_items (product), mode, customer_email, success_url, cancel_url and metadata. Its for the stripe checkout.
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    customer_email: email,
    success_url: `${process.env.PUBLIC_URL}/cart?success=1`,
    cancel_url: `${process.env.PUBLIC_URL}/cart?canceled=1`,
    metadata: { orderId: orderDoc._id.toString(), test: "ok" },
  });

  res.json({
    url: session.url,
  });
}
