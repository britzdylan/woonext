import {
  getProducts,
  getProductCategories,
  getAttributes,
  getAttributeTerms,
  getProductTags,
} from '../../lib/wc_api';
import Link from 'next/link';
import Image from 'next/image';

export default function AllProducts({ categories, products, attr, tags }) {
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
  // console.log(data);
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
          <Link href='/'>
            <p className='quantity-select-label active'>10</p>
          </Link>
          <Link href='/'>
            <p className='quantity-select-label'>20</p>
          </Link>
          <Link href='/'>
            <p className='quantity-select-label'>30</p>
          </Link>
        </div>
        <div id='sorting'>
          <select name='sorting' className='px-4 py-2 outline-none '>
            <option defaultValue value='Default Sorting'>
              Default Sorting
            </option>
            <option value='Sort by popularity'>Sort by popularity</option>
            <option value='Sort by price: low to high'>
              Sort by price: low to high
            </option>
            <option value='Sort by price: high to low'>
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
                    <p className='opacity-75 my-2 text-sm cursor-pointer hover:opacity-100'>
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
                          <li
                            class='flex flex-row items-center'
                            key={term.id + '_term'}>
                            <p className='opacity-75 my-2 text-sm cursor-pointer hover:opacity-100 attribute-term'>
                              {term.name} ({term.count})
                            </p>
                          </li>
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
              <div key={item.id + '_product'} class='product'>
                <Image
                  width={200}
                  height={200}
                  src={item.images[0].src}
                  alt={item.name}
                />
                <p class='title'>{item.name}</p>
                <p class='price'>R {item.price}</p>
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
