import {
  getProducts,
  getProductCategories,
  getAttributes,
  getAttributeTerms,
  getProductTags,
} from '../../lib/wc_api';

import { useRouter } from 'next/router';

// components
import ProductCard from '../../components/products/product-card';
import ShopHeader from '../../components/shop/header';
import Attributes from '../../components/shop/attributes';
import Tags from '../../components/shop/tags';
import Categories from '../../components/shop/categories';
import Pagination from '../../components/shop/pagination';
import Filter from '../../components/shop/filter';
import BreadCrumbs from '../../components/shop/breadcrumbs';

export default function AllProducts({ categories, products, attr, tags }) {
  // ================================================= variables =================================================

  const router = useRouter();
  console.log(router);

  const paths = [{ title: 'shop', url: '/shop' }];

  return (
    <div>
      {/* {/* ============================================================================================= */}

      <BreadCrumbs paths={paths} />
      {/* ============================================================================================= */}
      <ShopHeader />

      {/* ============================================================================================= */}
      <Filter />
      {/* ============================================================================================= */}
      <section id='shop-container'>
        <aside id='shop-filters'>
          <Categories categories={categories} />
          <Attributes attr={attr} />
          <Tags tags={tags} />
        </aside>
        <main>
          <div id='products-container'>
            {products.map((item) => {
              return <ProductCard item={item} key={item.id + '_product'} />;
            })}
          </div>
          <Pagination total={products.length} />
        </main>
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  // get products
  let products = await getProducts(query);
  // get attributes
  let attr = await getAttributes();
  // loop over attributes and get terms
  attr.map(async (item) => {
    let res = await getAttributeTerms(item.id);
    // push terms into sub array of the attributes
    item.terms = [...res];
  });
  //get tags
  let tags = await getProductTags();
  // get categories
  let categories = await getProductCategories();
  return {
    props: { products, categories, attr, tags }, // will be passed to the page component as props
    // props: { products }, // will be passed to the page component as props
  };
}
