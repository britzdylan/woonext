import { getProductBySlug, getProducts } from '../../lib/wc_api';
import { useState } from 'react';

// Components
import BreadCrumbs from '../../components/shop/breadcrumbs';
import ProductDescription from '../../components/products/product-description';
import ProductAddtInfo from '../../components/products/product-addt-info';
import ProductReview from '../../components/products/product-review';
import RelatedProducts from '../../components/products/related-products';
import ProductImages from '../../components/products/product-images';
import ProductInfo from '../../components/products/product-info';

export default function SingleProduct({ data }) {
  const [productDetails, setProductDetails] = useState(0);
  const { product, related, reviews } = data;

  const paths = [
    { title: 'Shop', url: '/shop' },
    { title: product.name, url: `/${product.slug}` },
  ];

  return (
    <section>
      <BreadCrumbs paths={paths} />
      <main
        id='product-info-container'
        className='w-full flex flex-row items-start'>
        {/* Product images */}
        <ProductImages images={product.images} />
        {/* Product info */}
        <ProductInfo product={product} />
      </main>
      <aside id='product-details-cotainer' className='py-12'>
        <div className='product-tabs'>
          <button
            onClick={() => setProductDetails(0)}
            className={
              `${productDetails == 0 ? 'bg-blue-500 text-white' : null}` +
              ' py-3 px-6  font-bold rounded-2xl'
            }>
            Description
          </button>
          <button
            onClick={() => setProductDetails(1)}
            className={
              `${productDetails == 1 ? 'bg-blue-500 text-white' : null}` +
              ' py-3 px-6  font-bold rounded-2xl'
            }>
            Additional Information
          </button>
          {product.reviews_allowed ? (
            <button
              onClick={() => setProductDetails(2)}
              className={
                `${productDetails == 2 ? 'bg-blue-500 text-white' : null}` +
                ' py-3 px-6  font-bold rounded-2xl'
              }>
              Reviews ({product.rating_count})
            </button>
          ) : null}
        </div>
        <hr className='border-gray-200 my-4' />
        <div className='product-details py-12'>
          {productDetails == 0 ? (
            <ProductDescription description={product.description} />
          ) : null}
          {productDetails == 1 ? (
            <ProductAddtInfo
              attributes={product.attributes}
              dimensions={product.dimensions}
              weight={product.weight}
            />
          ) : null}
          {productDetails == 2 ? (
            <ProductReview reviews={reviews} product={product} />
          ) : null}
        </div>
        <RelatedProducts related={related} />
      </aside>
    </section>
  );
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

  let data = await getProductBySlug(params.slug);

  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 10,
  };
}
