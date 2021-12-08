// import { useEffect } from 'react';
// import { useSetRecoilState, useRecoilValue } from 'recoil';
// import { productSettingsState } from '../../store/state/settings';
// import { getWoocommerceProductSettings } from '../../lib/wc_api';

export default function Layout({ children }) {
  // const setProdutSettings = useSetRecoilState(productSettingsState);
  // const productSettings = useRecoilValue(productSettingsState);
  // useEffect(async () => {
  //   try {
  //     let res;
  //     res = await getWoocommerceProductSettings();
  //     if (res instanceof Error) throw new Error(res);
  //     // console.log(res, 'getWoocommerceProductSettings');
  //     setProdutSettings(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, []);

  return (
    <>
      <main>
        <h1>Layout</h1>
        {children}
      </main>
    </>
  );
}
