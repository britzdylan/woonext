import { useRouter } from 'next/router';
import BreadCrumbs from '../../../components/shop/breadcrumbs';

export default function Category() {
  const router = useRouter();
  console.log(router);
  const paths = [
    { title: 'shop', url: '/shop' },
    { title: router.query.slug, url: `/${router.query.slug}` },
  ];

  return <BreadCrumbs paths={paths} />;
}
