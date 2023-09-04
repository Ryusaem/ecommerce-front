// Featured component: displays the featured product
import Featured from "@/components/Featured";
// Header component: displays the header
import Header from "@/components/Header";
// NewProducts component: displays the new products
import NewProducts from "@/components/NewProducts";
// mongooseConnect function: allows us to connect to the database
import { mongooseConnect } from "@/lib/mongoose";
// Product model: allows us to query the database for products
import { Product } from "@/models/Product";

// GOAL: This page will display the home page of our website. It will display the featured product and the new products.

// index.js → Header + Featured (props: featured product) + NewProducts (props: all product, limit to 10)

// Featured → Center → ColumnWrapper → Column → Title + Desc + ButtonsWrapper → ButtonLink + Button

// NewProducts → Center → Title + ProductsGrid (props: all products)
// ProductsGrid → ProductBox (props: product (one product))
// ProductBox → Image + Title + Price
export default function HomePage({ featuredProduct, newProducts }) {
  return (
    <div>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </div>
  );
}

// getServerSideProps function: allows us to fetch data on the server side. It mean that the data will be fetched before the page is rendered. For example if we want to fetch data from the database, we can do it here.
export async function getServerSideProps() {
  // This is an id of a product that we want to display as the featured product
  const featuredProductId = "64a8150b88e78ab7c8b3738e";

  await mongooseConnect();

  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    // We want to sort the products by the most recent and we want to limit the number of products to 10
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    // props will be passed to the page component as props and it contains the data that we fetched from the database (featuredProduct and newProducts)
    props: {
      // We need to convert the featuredProduct and newProducts to JSON and then parse it to remove the mongoose specific properties
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
