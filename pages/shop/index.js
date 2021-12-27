import {
  getProducts,
  getProductCategories,
  getAttributes,
  getAttributeTerms,
  getProductTags,
} from '../../lib/wc_api';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function AllProducts({ categories, products, attr, tags }) {
  // ================================================= variables =================================================

  const router = useRouter();
  const { asPath } = router;
  const { per_page, attribute_term, order_by, order } = router.query;
  console.log(asPath);
  // ================================================= funtions =================================================
  async function toggleFilterBlock(id, context) {
    let item = document.getElementById(id);
    if (item.style.display == 'none') {
      item.style.display = 'block';
      document.getElementById(`chevron-up-${context}`).style.display = 'none';
      document.getElementById(`chevron-down-${context}`).style.display =
        'block';
      return;
    }

    if (item.style.display == 'block') {
      document.getElementById(`chevron-up-${context}`).style.display = 'block';
      document.getElementById(`chevron-down-${context}`).style.display = 'none';
      item.style.display = 'none';
      return;
    }
  }

  function updateSortMethod(e) {
    const isEmpty = Object.keys(router.query).length == 0 ? true : false;
    const hasSortFilter = router.query.order_by ? true : false;
    const query = { ...router.query };
    if (isEmpty) {
      router.replace(asPath + `?${e.target.value}`);
    } else if (hasSortFilter) {
      if (e.target.value == '') {
        delete query.order;
        delete query.order_by;
      } else {
        const values = e.target.value.split('=');
        console.log(values);
        query.order = values[1].split('&')[0];
        query.order_by = values[2];
      }
      router.replace({
        pathname: '/shop',
        query: query,
      });
    } else {
      router.replace(asPath + `&${e.target.value}`);
    }
  }
  // ================================================= eo funtions =================================================

  return (
    <div>
      {/* ============================================================================================= */}

      <div id='breadcrumbs'>
        <small className='opacity-70'>
          <Link href='/'>Home</Link> / <Link href='/shop'>Shop</Link>
        </small>
      </div>
      {/* ============================================================================================= */}

      <header className='shop-header'>
        <h1>Shop</h1>
        <p>Browse our favorite sale products and brands.</p>
      </header>
      {/* ============================================================================================= */}
      <div id='filter-bar'>
        <div className='quantity-select'>
          <p>Show:</p>
          <Link
            href={{
              pathname: '/shop',
              query: { ...router.query, per_page: 9 },
            }}
            replace={true}>
            <p
              className={
                !per_page || per_page == 9
                  ? 'active quantity-select-label'
                  : 'quantity-select-label'
              }>
              9
            </p>
          </Link>
          <Link
            href={{
              pathname: '/shop',
              query: { ...router.query, per_page: 18 },
            }}
            replace={true}>
            <p
              className={
                per_page == 18
                  ? 'active quantity-select-label'
                  : 'quantity-select-label'
              }>
              18
            </p>
          </Link>
          <Link
            href={{
              pathname: '/shop',
              query: { ...router.query, per_page: 27 },
            }}
            replace={true}>
            <p
              className={
                per_page == 27
                  ? 'active quantity-select-label'
                  : 'quantity-select-label'
              }>
              27
            </p>
          </Link>
        </div>
        <div id='sorting'>
          <select
            onChange={(e) => updateSortMethod(e)}
            name='sorting'
            className='px-4 py-2 outline-none '>
            <option selected={!order_by ? true : false} defaultValue value=''>
              Default Sorting
            </option>
            <option
              selected={order_by == 'popularity' ? true : false}
              value='order=desc&order_by=popularity'>
              Sort by popularity
            </option>
            <option
              selected={order_by == 'price' && order == 'asc' ? true : false}
              value='order=asc&order_by=price'>
              Sort by price: low to high
            </option>
            <option
              selected={order_by == 'price' && order == 'desc' ? true : false}
              value='order=desc&order_by=price'>
              Sort by price: high to low
            </option>
          </select>
        </div>
      </div>
      {/* ============================================================================================= */}
      <section id='shop-container'>
        <aside id='shop-filters'>
          <div className='categories-container filter-container'>
            <header
              className='cursor-pointer'
              onClick={() => toggleFilterBlock('categories-body', 'category')}>
              <p>Categories</p>
              <svg
                style={{ display: 'none' }}
                id='chevron-up-category'
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 15l7-7 7 7'
                />
              </svg>
              <svg
                id='chevron-down-category'
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </header>
            <div
              style={{ display: 'block' }}
              id='categories-body'
              className='filter-body'>
              {categories.map((item) => {
                return (
                  <Link
                    key={item.id + '_category'}
                    href={`/shop/category/${item.slug}`}>
                    <p
                      className={item.slug == router.query.slug ? 'active' : ''}
                      className='opacity-75 my-2 text-sm cursor-pointer hover:opacity-100'>
                      {item.name}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
          {attr.map((item) => {
            if (item.terms && item.terms.length > 0) {
              return (
                <div
                  key={item.id + '_attribute'}
                  className='attributes-container filter-container'>
                  <header
                    className='cursor-pointer'
                    onClick={() =>
                      toggleFilterBlock(`${item.name}-body`, item.name)
                    }>
                    <p>{item.name}</p>
                    <svg
                      style={{ display: 'none' }}
                      id={`chevron-up-${item.name}`}
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 15l7-7 7 7'
                      />
                    </svg>
                    <svg
                      id={`chevron-down-${item.name}`}
                      xmlns='http://www.w3.org/2000/svg'
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </header>
                  <div
                    style={{ display: 'block' }}
                    id={`${item.name}-body`}
                    className='filter-body'>
                    <ul>
                      {item.terms.map((term) => {
                        return (
                          <Link
                            key={term.id + '_term'}
                            href={`/shop?attribute=${item.slug}&attribute_term=${term.id}`}
                            replace={true}>
                            <li className='flex flex-row items-center'>
                              <p
                                className={
                                  `${
                                    term.id == attribute_term
                                      ? 'attribute-term-selected'
                                      : ''
                                  }` +
                                  ' opacity-75 my-2 text-sm cursor-pointer hover:opacity-100 attribute-term'
                                }>
                                {term.name} ({term.count})
                              </p>
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            }
          })}

          <div className='tags-container filter-container'>
            <header
              className='cursor-pointer'
              onClick={() => toggleFilterBlock('tags-body', 'tags')}>
              <p>Tags</p>
              <svg
                style={{ display: 'none' }}
                id='chevron-up-tags'
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M5 15l7-7 7 7'
                />
              </svg>
              <svg
                id='chevron-down-tags'
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </header>
            <div
              style={{ display: 'block' }}
              id='tags-body'
              className='filter-body pt-4 '>
              <div className='flex flex-row justify-start items-center flex-wrap'>
                {tags.length > 0
                  ? tags.map((tag) => {
                      return (
                        <small
                          className='rounded-full p-2 bg-gray-100 mr-2 mb-2 cursor-pointer block w-min'
                          key={tag.id + '_tag'}>
                          {tag.name}
                        </small>
                      );
                    })
                  : null}
              </div>
            </div>
          </div>
        </aside>
        <main id='products-container'>
          {products.map((item) => {
            return (
              <div key={item.id + '_product'} className='product'>
                <Image
                  width={200}
                  height={200}
                  src={item.images[0].src}
                  alt={item.name}
                />
                <p className='title'>{item.name}</p>
                <p className='price'>R {item.price}</p>
                <button>Add to cart</button>
              </div>
            );
          })}
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
  };
}
