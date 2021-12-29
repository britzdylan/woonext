import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Pagination({ products }) {
  const router = useRouter();
  const { page } = router.query;

  return products === 9 ? (
    <div id='shop-pagination-container'>
      <Link
        href={{
          pathname: '/shop',
          query: {
            ...router.query,
            page: page > 1 ? Number(page) - 1 : 1,
          },
        }}>
        <div className='pagination-prev'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 mr-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>{' '}
          <p>Previous</p>
        </div>
      </Link>

      <div className='pagination-pages'>
        {page > 1 ? (
          <Link
            href={{
              pathname: '/shop',
              query: {
                ...router.query,
                page: page > 1 ? Number(page) - 1 : null,
              },
            }}>
            <p className={'page-number'}>{page ? Number(page) - 1 : null}</p>
          </Link>
        ) : null}
        <p className={'active page-number'}>{page ? page : 1}</p>
        {products.length >= 9 ? (
          <Link
            href={{
              pathname: '/shop',
              query: {
                ...router.query,
                page: page > 1 ? Number(page) + 1 : 2,
              },
            }}>
            <p className={'page-number'}>{page ? Number(page) + 1 : 2}</p>
          </Link>
        ) : null}
      </div>

      <Link
        href={{
          pathname: '/shop',
          query: {
            ...router.query,
            page: page ? Number(page) + 1 : 2,
          },
        }}>
        <div className='pagination-next'>
          <p> Next</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-4 w-4 ml-2'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </div>
      </Link>
    </div>
  ) : null;
}
