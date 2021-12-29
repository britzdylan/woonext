import Image from 'next/image';
import Link from 'next/link';
export default function CategoryCard({ item }) {
  const src = item.image != null ? item.image.src : '/200x200.jpg';
  return (
    <div className='category-card'>
      <Image width={200} height={200} src={src} alt={item.name} />
      {/* CTA */}

      <Link href={`/shop?category=${item.slug}`}>
        <button>{item.name}</button>
      </Link>
    </div>
  );
}
