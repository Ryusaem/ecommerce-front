import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ product }) {
  return (
    <div>
      <Header />
      <Featured product={product} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "64a8150b88e78ab7c8b3738e";
  await mongooseConnect();
  const product = await Product.findById(featuredProductId);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  };
}
