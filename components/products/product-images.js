import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ProductImages({ images }) {
  const [image, setImage] = useState({
    src: '/200x200.jpg',
    alt: 'Placeholder',
  });

  useEffect(() => {
    setImage(images[0]);
  }, []);

  return (
    <div className='product-images '>
      <div className='product-additional-images'>
        {images.map((item) => (
          <div
            key={item.id + '_product_image'}
            className={
              `${image.id == item.id ? 'border-2 border-blue-500' : null}` +
              ' product-single-addt-image'
            }>
            <Image
              onClick={() => setImage(item)}
              layout='responsive'
              width={50}
              height={50}
              src={item.src}
              alt={item.alt}
              className='my-2'
              priority
            />
          </div>
        ))}
      </div>
      <div className='product-main-image '>
        <Image
          width={400}
          height={400}
          layout='responsive'
          src={image.src}
          alt={image.alt}
          priority
        />
      </div>
    </div>
  );
}
