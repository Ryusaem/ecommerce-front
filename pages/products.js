import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { styled } from "styled-components";

const Title = styled.h1`
  font-size: 1.5em;
`;

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Product</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

export async function getServerSideProps() {
  await mongooseConnect();
  // first param is the query, second param is the fields we want to select, third param is the options.
  //we want all the products, we don't want to select anything, and we want to sort them by id in descending order
  const products = await Product.find({}, null, { sort: { _id: -1 } });
  return {
    props: {
      // we need to use parse and stringify to remove the _id and other mongoose properties
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
