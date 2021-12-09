import { getProducts } from '../../lib/wc_api';
import Link from 'next/link';
export default function AllProducts({ data }) {
  // console.log(data);
  return (
    <div>
      {data.map((item) => {
        return (
          <Link href={`/products/${item.slug}`}>
            <h1 key={item.id}>{item.name}</h1>
          </Link>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;

  let data = await getProducts(query);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
