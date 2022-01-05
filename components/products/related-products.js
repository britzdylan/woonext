import ProductCard from '../products/product-card';

export default function RelatedProducts({ related }) {
  return (
    <div className='py-8 w-full border-t border-gray-200 '>
      <p className='text-lg font-bold'>Related Products</p>
      <div className='py-2 flex flex-row items-center'>
        {related.map((item) => {
          return (
            <div key={item.id + '_product_related'} className='mr-4 last:mr-0'>
              <ProductCard item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
