// settingsSlice.ts
import { ProSettings } from '@ant-design/pro-components';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

const initialState: ProSettings = {
  colorPrimary: '#1677FF',
  contentWidth: 'Fluid',
  fixSiderbar: true,
  layout: 'mix',
  navTheme: 'light',
  splitMenus: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateSettings(state, action: PayloadAction<Partial<ProSettings>>) {
      //   console.log('Updating settings:', action.payload);
      return { ...state, ...action.payload };
    },
  },
});

export const { updateSettings } = settingsSlice.actions;
export const selectSetting = (state: RootState) => state.setting;
export default settingsSlice.reducer;
