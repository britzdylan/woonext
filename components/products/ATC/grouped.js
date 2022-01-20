export default function GroupedATC({ grouped_products = [] }) {
  return (
    <div className='grouped-product-links'>
      {grouped_products.map((product) => (
        <div key={product.id} class={`${product.type} grouped`}>
          {product.type == 'simple' ? (
            <a target='_blank' href={`/shop/${product.slug}`}>
              <button className='min-w-[200px] btn-primary'>Add to cart</button>
            </a>
          ) : null}
          {product.type == 'variable' ? (
            <a target='_blank' href={`/shop/${product.slug}`}>
              <button className='min-w-[200px] btn-primary'>
                Select Options
              </button>
            </a>
          ) : null}
          {product.type == 'external' ? (
            <a target='_blank' href={`/shop/${product.slug}`}>
              <button className='min-w-[200px] btn-primary'>
                Buy in best Buy
              </button>
            </a>
          ) : null}
          <p>{product.name}</p>
        </div>
      ))}
    </div>
  );
}
