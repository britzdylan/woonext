export default function ExternalATC({
  text = 'Add to cart',
  external_url = null,
}) {
  return (
    <div className='external atc'>
      <a href={external_url} target='_blank'>
        <button className='btn-primary'>{text}</button>
      </a>
    </div>
  );
}
