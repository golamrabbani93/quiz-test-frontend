import axios, {AxiosError} from 'axios';
import type {AxiosRequestConfig} from 'axios';
import type {BaseQueryFn} from '@reduxjs/toolkit/query';
import type {RootState} from '../../store';
import {logout, setUser} from '../auth/authSlice';
import {toast} from 'sonner';

export const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	withCredentials: true, // to send cookies for refresh-token call
});

type Args = {
	url: string;
	method: AxiosRequestConfig['method'];
	data?: AxiosRequestConfig['data'];
	params?: AxiosRequestConfig['params'];
};

export const customBaseQueryWithRefreshToken: BaseQueryFn<Args, unknown, unknown> = async (
	args,
	api,
) => {
	const state = api.getState() as RootState;
	const token = state.auth.token;

	try {
		// Add Authorization header
		const result = await axiosInstance.request({
			url: args.url,
			method: args.method,
			data: args.data,
			params: args.params,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token ? `Bearer ${token}` : undefined,
			},
		});

		return {data: result.data};
	} catch (error) {
		const err = error as AxiosError;

		if (err.response?.status === 500 || err.response?.status === 401) {
			// Try refresh token
			try {
				const refreshResponse = await axiosInstance.post('/auth/refresh-token', null, {
					withCredentials: true,
				});

				const newAccessToken = refreshResponse.data?.data?.accessToken;
				if (newAccessToken) {
					// Update token & user in redux
					const user = (api.getState() as RootState).auth.user;
					api.dispatch(setUser({user, token: newAccessToken}));

					// Retry original query with new token
					const retryResult = await axiosInstance.request({
						url: args.url,
						method: args.method,
						data: args.data,
						params: args.params,
						headers: {
							Authorization: `Bearer ${newAccessToken}`,
						},
					});

					return {data: retryResult.data};
				} else {
					api.dispatch(logout());
					return {error: {status: 401, data: 'Unauthorized'}};
				}
			} catch {
				api.dispatch(logout());
				toast.error('Session expired. Please log in again.');
				return {error: {status: 401, data: 'Unauthorized'}};
			}
		}

		return {
			error: {
				status: err.response?.status,
				data: err.response?.data || err.message,
			},
		};
	}
};
