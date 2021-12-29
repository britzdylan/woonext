import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Filter() {
  const router = useRouter();
  const { per_page, order_by, order } = router.query;
  return (
    <div id='filter-bar'>
      <div className='quantity-select'>
        <p>Show:</p>
        <Link
          href={{
            pathname: '/shop',
            query: { ...router.query, per_page: 9 },
          }}
          replace={true}>
          <p
            className={
              !per_page || per_page == 9
                ? 'active quantity-select-label'
                : 'quantity-select-label'
            }>
            9
          </p>
        </Link>
        <Link
          href={{
            pathname: '/shop',
            query: { ...router.query, per_page: 18 },
          }}
          replace={true}>
          <p
            className={
              per_page == 18
                ? 'active quantity-select-label'
                : 'quantity-select-label'
            }>
            18
          </p>
        </Link>
        <Link
          href={{
            pathname: '/shop',
            query: { ...router.query, per_page: 27 },
          }}
          replace={true}>
          <p
            className={
              per_page == 27
                ? 'active quantity-select-label'
                : 'quantity-select-label'
            }>
            27
          </p>
        </Link>
      </div>
      <div id='sorting'>
        <select
          onChange={(e) => updateSortMethod(e)}
          name='sorting'
          className='px-4 py-2 outline-none '>
          <option selected={!order_by ? true : false} defaultValue value=''>
            Default Sorting
          </option>
          <option
            selected={order_by == 'popularity' ? true : false}
            value='order=desc&order_by=popularity'>
            Sort by popularity
          </option>
          <option
            selected={order_by == 'price' && order == 'asc' ? true : false}
            value='order=asc&order_by=price'>
            Sort by price: low to high
          </option>
          <option
            selected={order_by == 'price' && order == 'desc' ? true : false}
            value='order=desc&order_by=price'>
            Sort by price: high to low
          </option>
        </select>
      </div>
    </div>
  );
}
