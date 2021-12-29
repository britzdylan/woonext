export default function ShopHeader({
  title = 'Shop',
  description = 'Browse our favorite sale products and brands.',
}) {
  return (
    <header className='shop-header'>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
