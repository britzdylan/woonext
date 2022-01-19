import { useState } from 'react';

export default function SimpleATC() {
  const [quantity, setQuantity] = useState(1);
  return (
    <div className='simple atc '>
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
  );
}
