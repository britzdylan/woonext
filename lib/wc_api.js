import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const api = new WooCommerceRestApi({
  url: process.env.woocomerce_url,
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  version: 'wc/v3',
  queryStringAuth: true, // Force Basic Authentication as query string true and using under HTTPS
});

async function getProductTags(product) {
  return api
    .get(`products/tags`, {
      per_page: 100,
      hide_empty: true,
    })
    .then((response) => {
      // Successful request
      console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getAttributeTerms(id) {
  return api
    .get(`products/attributes/${id}/terms`)
    .then((response) => {
      // Successful request
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}
async function getAttributes() {
  return api
    .get('products/attributes')
    .then((response) => {
      // Successful request
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getProductCategories(options = {}) {
  const { page, per_page, parent } = options;
  return api
    .get('products/categories', {
      page: page ? page : 1,
      per_page: per_page ? per_page : 10,
      hide_empty: true,
      parent: parent ? parent : 0,
    })
    .then((response) => {
      // Successful request
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getProducts(options = {}) {
  const {
    page,
    per_page,
    featured,
    category,
    tag,
    attribute,
    attribute_term,
    on_sale,
    order,
    orderby,
    search,
  } = options;
  return api
    .get('products', {
      page: page ? page : 1,
      per_page: per_page ? per_page : 9,
      status: 'publish',
      featured: featured ? featured : null,
      category: category ? category : null,
      tag: tag ? tag : null,
      attribute: attribute ? attribute : null,
      attribute_term: attribute_term ? attribute_term : null,
      on_sale: on_sale ? on_sale : null,
      orderby: orderby ? orderby : null,
      order: order ? order : null,
      search: search ? search : null,
    })
    .then((response) => {
      // Successful request
      // console.log(response.data);
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getProductBySlug(slug = null) {
  return api
    .get('products', {
      slug: slug,
    })
    .then(async (response) => {
      // Successful request
      const data = { product: null, related: [], reviews: [] };
      // product
      data.product = response.data[0];

      const res = await response.data[0].related_ids.map(async (id) => {
        return await getProductByID(id);
      });
      // related products
      data.related = await Promise.all(res);
      // reviews
      data.reviews = await getProductReviews(response.data[0].id);

      return data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.message);
      return error.response.message;
    });
}

async function getProductByID(id = null) {
  return api
    .get(`products/${id}`)
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

async function getProductReviews(id) {
  return api
    .get('products/reviews', { product: id })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      console.log(error.response.data);
      return error.response.data;
    });
}

async function postProductReview(data) {
  return api
    .post('products/reviews', data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      // Invalid request, for 4xx and 5xx statuses
      return error.response;
    });
}
module.exports = {
  getProducts,
  getWoocommerceProductSettings,
  getProductBySlug,
  getProductCategories,
  getAttributes,
  getAttributeTerms,
  getProductTags,
  getProductReviews,
  getProductByID,
  postProductReview,
};
