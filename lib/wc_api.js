import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.woocomerce_url,
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  version: 'wc/v3',
});

async function getProducts(per_page) {
  return api
    .get('products', {
      per_page: per_page,
      status: 'publish',
    })
    .then((response) => {
      // Successful request
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getWoocommerceProductSettings() {
  return api
    .get('settings/products')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.data);
      return error.response.data;
    });
}
module.exports = { getProducts, getWoocommerceProductSettings };
