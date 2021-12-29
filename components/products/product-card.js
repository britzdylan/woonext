import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ item }) {
  return (
    <div className='product relative'>
      {item.on_sale ? (
        <div className='product-on-sale-badge '>
          <small>sale!</small>
        </div>
      ) : null}
      <Image
        width={200}
        height={200}
        src={item.images[0].src}
        alt={item.name}
      />
      <p className='title'>{item.name}</p>
      {/* Price */}
      <div className='price-container '>
        {!item.on_sale ? <p className='price'>R {item.price}</p> : null}

        {item.on_sale && item.type == 'simple' ? (
          <p className='sale price'>R {item.sale_price}</p>
        ) : null}
        {item.on_sale && item.type != 'simple' ? (
          <p className='sale price'>R {item.price}</p>
        ) : null}
        {item.on_sale && item.type == 'simple' ? (
          <p className='sale price line-through'>R {item.regular_price}</p>
        ) : null}
      </div>
      {/* CTA */}
      {item.type == 'grouped' ? (
        <Link href={`/shop/${item.slug}`}>
          <button>View Products</button>
        </Link>
      ) : null}
      {item.type == 'variable' ? (
        <Link href={`/shop/${item.slug}`}>
          <button>Select options</button>
        </Link>
      ) : null}
      {item.type == 'simple' ? (
        <Link href={`/shop/${item.slug}`}>
          <button>Add to cart</button>
        </Link>
      ) : null}
      {item.type == 'external' ? (
        <Link href={`/shop/${item.slug}`}>
          <button>
            {item.button_text != '' ? item.button_text : 'Read More'}
          </button>
        </Link>
      ) : null}
    </div>
  );
}
