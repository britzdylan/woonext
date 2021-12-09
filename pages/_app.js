import '../styles/tailwind.css';
import '../styles/global.css';
import Layout from '../components/layouts/default';
import { RecoilRoot } from 'recoil';
import Script from 'next/script'
function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Layout {...pageProps}>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp;
