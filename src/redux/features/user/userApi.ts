import {baseApi} from '../api/baseApi';

const userApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllUser: builder.query({
			query: () => {
				return {
					url: '/users',
					method: 'GET',
				};
			},
			providesTags: [],
			transformResponse: (response) => response,
		}),
		getMyInfo: builder.query({
			query: () => {
				return {
					url: '/users/me',
					method: 'GET',
				};
			},
			providesTags: [],
			transformResponse: (response) => response.data,
		}),
		updateUserInfo: builder.mutation({
			query: (data) => ({
				url: '/users/me',
				method: 'PUT',
				body: data,
			}),
			invalidatesTags: [],
		}),
		makeAdmin: builder.mutation({
			query: (id) => ({
				url: `/users/make-admin/${id}`,
				method: 'PUT',
			}),
			invalidatesTags: [],
		}),
	}),
});

export const {
	useGetAllUserQuery,
	useGetMyInfoQuery,
	useUpdateUserInfoMutation,
	useMakeAdminMutation,
} = userApi;
