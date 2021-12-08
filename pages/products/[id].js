import api from '../lib/wc_api';

export default function SingleProduct() {
  return <h1>Single Product</h1>;
}

export async function getStaticProps(context) {
  api
    .get('products')
    .then((response) => {
      // Successful request
      console.log(response);
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error);
    });

  return {
    props: {}, // will be passed to the page component as props
  };
}
