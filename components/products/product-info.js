import Link from 'next/link';
import SimpleATC from './ATC/simple';
import ExternalATC from './ATC/external';
import VariableATC from './ATC/variable';
import GroupedATC from './ATC/grouped';

export default function ProductInfo({ product, variations, grouped_products }) {
  const rating = [1, 2, 3, 4, 5];

  function getProductATC() {
    switch (product.type) {
      case 'grouped':
        return <GroupedATC grouped_products={grouped_products} />;
      case 'simple':
        return <SimpleATC />;
      case 'external':
        return (
          <ExternalATC
            text={product.button_text}
            external_url={product.external_url}
          />
        );
      case 'variable':
        return <VariableATC product={product} variations={variations} />;
    }
  }

  return (
    <div className='product-info'>
      {/* title */}

      <div className='flex flex-row items-center mb-6'>
        <h1 className=' text-3xl mr-4'>{product.name}</h1>
      </div>

      {/* averagre rating */}
      {product.rating_count > 0 ? (
        <div className='review-stars flex flex-row items-center mb-6'>
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
      ) : null}

      {/* product pricing */}

      <div className='flex flex-row items-center mb-6'>
        {product.on_sale && product.type != 'grouped' ? (
          <p className='text-2xl text-gray-300  line-through mr-2'>
            R {product.regular_price}{' '}
          </p>
        ) : null}
        <p className='text-2xl font-bold'>R {product.price} </p>
        {product.on_sale ? (
          <span className='text-white text-sm p-2 rounded-xl bg-red-600 ml-4'>
            On Sale
          </span>
        ) : null}
      </div>

      {/* product short description */}

      <div
        className='mb-6'
        dangerouslySetInnerHTML={{
          __html: product.short_description,
        }}></div>

      {/* product ATC */}

      {getProductATC()}

      {/* product stock status */}

      {product.stock_status == 'instock' &&
      product.type == 'simple' &&
      !product.virtual ? (
        <p className='error mb-6'>
          {product.stock_quantity} Items left in Stock
        </p>
      ) : null}

      {/* product meta */}

      <div className='product-meta'>
        {product.type == 'simple' ? (
          <small>SKU: {product.sku != '' ? product.sku : ''}</small>
        ) : null}
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
        {product.tags.length > 0 ? (
          <small>
            Tags:{' '}
            {product.tags.map((tag) => (
              <Link
                key={tag.id + '_tag'}
                href={`/shop?tag=${tag.id}`}>{`${tag.name}, `}</Link>
            ))}
          </small>
        ) : null}
      </div>
    </div>
  );
}
