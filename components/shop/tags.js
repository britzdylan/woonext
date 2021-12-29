import Link from 'next/link';
import { useRouter } from 'next/router';
import { toggleFilterBlock } from '../../lib/helper';

export default function Tags({ tags }) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <div className='tags-container filter-container'>
      <header
        className='cursor-pointer'
        onClick={() => toggleFilterBlock('tags-body', 'tags')}>
        <p>Tags </p>
        <svg
          style={{ display: 'none' }}
          id='chevron-up-tags'
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
          id='chevron-down-tags'
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
        id='tags-body'
        className='filter-body pt-4 '>
        <div className='flex flex-row justify-start items-center flex-wrap'>
          {tags.length > 0
            ? tags.map((value) => {
                return (
                  <Link
                    href={{
                      pathname: '/shop',
                      query: { ...router.query, tag: value.id },
                    }}
                    replace={true}
                    key={value.id + '_tag'}>
                    <small
                      className={
                        `${tag == value.id ? 'active-tag' : null}` + ' tag'
                      }>
                      {value.name}
                      {tag == value.id ? (
                        <Link
                          href={{
                            pathname: '/shop',
                            query: { ...router.query, tag: null },
                          }}
                          replace={true}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className='h-4 w-4'
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='white'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </Link>
                      ) : null}
                    </small>
                  </Link>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
