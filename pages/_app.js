// import '../styles/tailwind.css';
import '../styles/output.css';
import Layout from '../components/layouts/default';
import { RecoilRoot } from 'recoil';

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
