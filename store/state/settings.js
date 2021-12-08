import { atom } from 'recoil';

export const productSettingsState = atom({
  key: 'productSettings', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
