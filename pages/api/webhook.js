import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SK);
import { buffer } from "micro";

// Goal: the aim of the webhook is to update the order in our database when the payment is successful

// the endpointSecret is a Stripe signing secret that we will use to validate the webhook
const endpointSecret =
  "whsec_18241f6240a71eaf9c95fdf819c3c387fbfc7382bb6fb5bae7b4a989da8ab291";

export default async function handler(req, res) {
  await mongooseConnect();

  // sig is the Stripe signature header
  const sig = req.headers["stripe-signature"];

  // event is the actual Stripe event
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    // we use the checkout.session.completed because we could check our metadata in there.
    case "checkout.session.completed":
      // data is the actual session object
      const data = event.data.object;

      // orderId is the id of the order we created in our database
      const orderId = data.metadata.orderId;

      // if the order is paid, we update the order in our database
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send("ok");
}

// we need to disable bodyParser because stripe needs the raw body to validate the request
export const config = {
  api: { bodyParser: false },
};
