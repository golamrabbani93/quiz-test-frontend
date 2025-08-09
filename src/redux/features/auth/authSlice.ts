import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
	user: null | {email: string; name: string};
	token: string | null;
}

const initialState: AuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (
			state,
			action: PayloadAction<{user: {email: string; name: string} | null; token: string}>,
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		logout: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const {setUser, logout} = authSlice.actions;
export default authSlice.reducer;
