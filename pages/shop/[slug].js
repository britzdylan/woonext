import { getProductBySlug, getProducts } from '../../lib/wc_api';

export default function SingleProduct({ data }) {
  return <h1>{data.name}</h1>;
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  let products = [];
  let paths = [];
  products = await getProducts({});

  if (products) {
    // Get the paths we want to pre-render based on posts
    paths = products.map((post) => ({
      params: { slug: post.slug },
    }));
  }
  return { paths, fallback: false };

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
}

export async function getStaticProps(context) {
  const { params } = context;
  // console.log(params);
  let data = await getProductBySlug(params.slug);
  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 10,
  };
}
