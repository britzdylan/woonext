import { getProductBySlug, getProducts } from '../../lib/wc_api';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// Components
import BreadCrumbs from '../../components/shop/breadcrumbs';
import ProductDescription from '../../components/products/product-description';
import ProductAddtInfo from '../../components/products/product-addt-info';
import ProductReview from '../../components/products/product-review';
import RelatedProducts from '../../components/products/related-products';

export default function SingleProduct({ data }) {
  const [image, setImage] = useState({
    src: '/200x200.jpg',
    alt: 'Placeholder',
  });
  const [productDetails, setProductDetails] = useState(0);

  const paths = [
    { title: 'Shop', url: '/shop' },
    { title: 'Categories', url: '/categories' },
    { title: 'Product', url: '/product' },
  ];

  return (
    <section>
      <BreadCrumbs paths={paths} />
      <main
        id='product-info-container'
        className='w-full flex flex-row items-start'>
        {/* Product images */}
        <div className='product-images flex flex-row items-start w-3/6 p-4 border rounded-lg border-gray-200'>
          <div className='product-additional-images w-2/12 pr-2'>
            <div className='mb-2 border-2 rounded-2xl border-blue-500 overflow-hidden p-2 cursor-pointer'>
              <Image
                layout='responsive'
                width={50}
                height={50}
                src={image.src}
                alt={image.alt}
                className='my-2'
              />
            </div>
            <div className='mb-2 rounded-2xl  overflow-hidden p-2'>
              <Image
                layout='responsive'
                width={50}
                height={50}
                src={image.src}
                alt={image.alt}
                className='my-2'
              />
            </div>
          </div>
          <div className='product-main-image w-10/12 rounded-2xl border-blue-500 overflow-hidden'>
            <Image
              width={400}
              height={400}
              layout='responsive'
              src={image.src}
              alt={image.alt}
            />
          </div>
        </div>
        {/* Product info */}
        <div className='product-info w-2/6  py-4 pl-16'>
          <h1 className='text-3xl font-bold '>
            Apple – HomePod mini – Space Gray
          </h1>
          <p className='text-2xl my-4'>R 361.00</p>
          <p>
            The Nest Learning Thermostat is a smart thermostat that learns your
            schedule and programs itself to help save energy. You can control it
            from anywhere with the Nest app, and it works with Alexa and Google
            Assistant so you can adjust the temperature with your voice. And
            it’s beautifully designed, with a big, bright display.
          </p>
          <div className='simple-atc my-8 w-full flex flex-row items-center'>
            <input
              type='number'
              className='quantity-select border border-gray-200 rounded-3xl p-4 w-20 mr-4'
              step='1'
              min='1'
              name='quantity'
              title='Qty'
              size='4'
              placeholder=''
              inputmode='numeric'
            />
            <button className='py-3 px-6 bg-blue-500 text-white font-bold rounded-2xl'>
              Add to cart
            </button>
          </div>
          <p className='text-red-400 font-medium mb-8'>
            Only 3 Items left in Stock
          </p>
          <div className='product-meta '>
            <small>SKU: 123456</small>
            <small>
              Category: <Link href='/'>Category</Link>
            </small>
            <small>
              Tags: <Link href='/'>Tag 1</Link>, <Link href='/'>Tag 2</Link>
            </small>
          </div>
        </div>
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
          <button
            onClick={() => setProductDetails(2)}
            className={
              `${productDetails == 2 ? 'bg-blue-500 text-white' : null}` +
              ' py-3 px-6  font-bold rounded-2xl'
            }>
            Reviews (0)
          </button>
        </div>
        <hr className='border-gray-200 my-4' />
        <div className='product-details py-12'>
          {productDetails == 0 ? <ProductDescription /> : null}
          {productDetails == 1 ? <ProductAddtInfo /> : null}
          {productDetails == 2 ? <ProductReview /> : null}
        </div>
        <RelatedProducts />
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
  // console.log(params);
  let data = await getProductBySlug(params.slug);
  return {
    props: { data }, // will be passed to the page component as props
    revalidate: 10,
  };
}
