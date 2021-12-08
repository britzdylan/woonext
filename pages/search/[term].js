import { getProductsWithSearch } from '../../lib/wc_api';

export default function AllProductsFromSearch({ data }) {
  // console.log(data);
  return (
    <div>
      {data.map((item) => {
        return <h1 key={item.id}>{item.name}</h1>;
      })}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  let data = await getProductsWithSearch(params.term);
  return {
    props: { data }, // will be passed to the page component as props
  };
}
