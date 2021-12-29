export default function ShopHeader({ title, description }) {
  return (
    <header className='shop-header'>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}
