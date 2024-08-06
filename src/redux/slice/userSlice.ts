import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '../../modules/login/type/loginType';
import lib from '../../utils/lib';
import { api } from '../api/api';

const initialState: UserState = {
  id: null,
  ref_id: null,
  name: null,
  email: null,
  mobile_number: null,
  photo: null,
  status: null,
  created_at: null,
  agency_id: null,
  agency_name: null,
  agency_status: null,
  agency_logo: null,
  token: null,
  btoc_commission: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{
        data: UserState | undefined;
      }>
    ) => {
      const { data } = action.payload;
      if (data) {
        return {
          ...state,
          ...data,
        };
      }
    },
    logout: (state) => {
      api.util.resetApiState();
      lib.removeLocalStorageItem('token');
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export const selectUser = (state: { user: UserState }) => state.user;
export default userSlice.reducer;
