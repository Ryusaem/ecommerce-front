const { Schema, model, models } = require("mongoose");

const OrderSchema = new Schema(
  {
    //line_items is an object with the quantity, price_data (currency, unit amount and product_data (name) of each product (we use it in the checkout page)
    line_items: Object,

    // we get the name, email, city, postalCode, streetAddress, country from the checkout Form
    name: String,
    city: String,
    email: String,
    postalCode: String,
    streetAddress: String,
    country: String,

    // paid is a boolean that indicates if the order has been paid or not and we get it from the Stripe API
    paid: Boolean,
  },
  {
    // Add createdAt and updatedAt fields to the schema and we get them from the Stripe API
    timestamps: true,
  }
);

// If the Order model exists, we export it, if it doesn't exist, we create it and then we export it.
// models == object that contains all the models that we have created.
// model == function that creates a model.
export const Order = models?.Order || model("Order", OrderSchema);
