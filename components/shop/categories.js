import Link from 'next/link';
import { useRouter } from 'next/router';
import { toggleFilterBlock } from '../../lib/helper';

export default function Categories({ categories }) {
  const router = useRouter();
  const { category } = router.query;
  const { asPath } = router;

  return (
    <div className='categories-container filter-container'>
      <header
        className='cursor-pointer'
        onClick={() => toggleFilterBlock('categories-body', 'category')}>
        <p>Categories</p>
        <svg
          style={{ display: 'none' }}
          id='chevron-up-category'
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 15l7-7 7 7'
          />
        </svg>
        <svg
          id='chevron-down-category'
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </header>
      <div
        style={{ display: 'block' }}
        id='categories-body'
        className='filter-body'>
        {categories.map((item) => {
          return (
            <Link
              key={item.id + '_category'}
              href={{
                pathname: '/shop',
                query: {
                  ...router.query,
                  category: item.slug == category ? null : item.slug,
                },
              }}>
              <p
                className={
                  `${
                    item.slug == category ? 'text-blue-500 font-bold' : null
                  }` +
                  ' opacity-75 my-2 text-sm cursor-pointer hover:opacity-100'
                }>
                {item.name}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
