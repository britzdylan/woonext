export default function ProductDescription({ description }) {
  return (
    <div
      className='prose'
      dangerouslySetInnerHTML={{
        __html: description,
      }}></div>
  );
}
