import {baseApi} from '../api/baseApi';

const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		register: builder.mutation({
			query: (userInfo) => {
				return {
					url: '/auth/signup',
					method: 'POST',
					data: userInfo,
				};
			},
		}),
		login: builder.mutation({
			query: (userInfo) => {
				return {
					url: '/auth/login',
					method: 'POST',
					data: userInfo,
				};
			},
		}),
	}),
});

export const {useRegisterMutation, useLoginMutation} = authApi;
