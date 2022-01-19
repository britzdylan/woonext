export default function ProductAddtInfo({ attributes, dimensions, weight }) {
  return (
    <div className='product-addt-info-container'>
      {attributes.map((item) => (
        <div
          key={item.id + '_attribute_addt_info'}
          className='product-addt-info-row '>
          <p className='font-bold min-w-[150px]'>{item.name}</p>
          <p>{item.options.toString()}</p>
        </div>
      ))}
      <div className='product-addt-info-row'>
        <p className='font-bold min-w-[150px]'>Size & Weight</p>
        <p>
          {weight}{' '}
          {dimensions.height != '' ? ' - ' + dimensions.height + ' x ' : null}
          {dimensions.width != '' ? dimensions.width + ' x ' : null}{' '}
          {dimensions.length}
        </p>
      </div>
    </div>
  );
}
