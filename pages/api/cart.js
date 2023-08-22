import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  // we connect to the databasep
  await mongooseConnect();

  // we get the ids from the request body
  const ids = req.body.ids;

  // we find the products with the ids from the request body and return them
  res.json(await Product.find({ _id: ids }));
}
