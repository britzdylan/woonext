import Link from 'next/link';
import { useRouter } from 'next/router';
import { toggleFilterBlock } from '../../lib/helper';

export default function Attributes({ attr }) {
  const router = useRouter();

  const { attribute_term, attribute } = router.query;

  return attr.map((item) => {
    if (item.terms && item.terms.length > 0) {
      return (
        <div
          key={item.id + '_attribute'}
          className='attributes-container filter-container'>
          <header
            className='cursor-pointer'
            onClick={() => toggleFilterBlock(`${item.name}-body`, item.name)}>
            <p>{item.name}</p>
            <svg
              style={{ display: 'none' }}
              id={`chevron-up-${item.name}`}
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
              id={`chevron-down-${item.name}`}
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
            id={`${item.name}-body`}
            className='filter-body'>
            <ul>
              {item.terms.map((term) => {
                return (
                  <Link
                    key={term.id + '_term'}
                    href={{
                      pathname: '/shop',
                      query: {
                        ...router.query,
                        attribute: item.slug == attribute ? null : item.slug,
                        attribute_term:
                          term.id == attribute_term ? null : term.id,
                      },
                    }}
                    replace={true}>
                    <li className='flex flex-row items-center'>
                      <p
                        className={
                          `${
                            term.id == attribute_term
                              ? 'attribute-term-selected'
                              : ''
                          }` +
                          ' opacity-75 my-2 text-sm cursor-pointer hover:opacity-100 attribute-term'
                        }>
                        {term.name} ({term.count})
                      </p>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  });
}
