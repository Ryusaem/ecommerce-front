import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

// Goal: get all the products from the database and display them in a grid

export default function ProductsPage({ products }) {
  return (
    <>
      <Header />
      <Center>
        <Title>All Products</Title>
        <ProductsGrid products={products} />
      </Center>
    </>
  );
}

// getServerSideProps goal is to get the product data from the database.
// Here we get all the products from the database
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
