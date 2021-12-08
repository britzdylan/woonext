import { getProducts } from '../../lib/wc_api';

export default function SingleProduct(res) {
  return <h1>H</h1>;
}

export async function getServerSideProps(context) {
  // let res = await getProducts();
  let data = await getProducts(20);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
