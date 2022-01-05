import Link from 'next/link';
import { useState } from 'react';

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const rating = [1, 2, 3, 4, 5];

  return (
    <div className='product-info'>
      {/* title */}

      <div className='flex flex-row items-center'>
        <h1 className='text-3xl font-bold mr-4'>{product.name}</h1>
      </div>

      {/* averagre rating */}
      <div className='review-stars flex flex-row items-center my-2'>
        {rating.map((value) =>
          Number(product.average_rating) >= value ? (
            <img
              key={value + '_star-rating-average_'}
              className='h-4 w-4 mr-2'
              src='/star.svg'
            />
          ) : null
        )}
        <a href='#product-details-cotainer'>(Reviews)</a>
      </div>

      {/* product pricing */}

      <div className='flex flex-row items-center'>
        {product.on_sale ? (
          <p className='text-2xl text-gray-300 my-4 line-through mr-2'>
            R {product.regular_price}{' '}
          </p>
        ) : null}
        <p className='text-2xl my-4'>R {product.price} </p>
        {product.on_sale ? (
          <span className='text-white text-sm p-2 rounded-xl bg-red-600 ml-4'>
            On Sale
          </span>
        ) : null}
      </div>

      {/* product description */}

      <div
        dangerouslySetInnerHTML={{
          __html: product.short_description,
        }}></div>

      {/* product ATC */}

      <div className='simple-atc '>
        <input
          type='number'
          className='quantity-select'
          step='1'
          min='1'
          name='quantity'
          title='Qty'
          size='4'
          placeholder='1'
          inputMode='numeric'
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <button className='btn-primary'>Add to cart</button>
      </div>

      {/* product stock status */}

      {product.stock_status == 'instock' ? (
        <p className='error'>
          Only {product.stock_quantity} Items left in Stock
        </p>
      ) : null}

      {/* product meta */}

      <div className='product-meta'>
        <small>SKU: {product.sku}</small>
        <small>
          Categories:{' '}
          {product.categories.length > 0
            ? product.categories.map((category) => (
                <Link
                  key={category.id + '_category'}
                  href={`/shop?category=${category.slug}`}>{`${category.name}, `}</Link>
              ))
            : null}
        </small>
        <small>
          Tags:{' '}
          {product.tags.length > 0
            ? product.tags.map((tag) => (
                <Link
                  key={tag.id + '_tag'}
                  href={`/shop?tag=${tag.id}`}>{`${tag.name}, `}</Link>
              ))
            : null}
        </small>
      </div>
    </div>
  );
}
