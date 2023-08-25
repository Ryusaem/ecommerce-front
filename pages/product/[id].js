import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function ProductPage({ product }) {
  return (
    <>
      <Header />
      <Center>
        <Title>{product.title}</Title>
      </Center>
    </>
  );
}
// getServerSideProps goal is to get the product data from the database
// "context" contains the route parameters for this file (id).
export async function getServerSideProps(context) {
  await mongooseConnect();

  // context.query contains the route parameters for this file (id).
  const { id } = context.query;

  // we get the product data from the database
  const product = await Product.findById(id);
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    },
  };
}
