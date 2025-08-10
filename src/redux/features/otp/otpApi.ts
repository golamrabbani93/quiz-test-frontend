import {baseApi} from '../api/baseApi';

const otpApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		sendOtp: builder.mutation({
			query: (email) => {
				return {
					url: '/otp/send-otp',
					method: 'POST',
					data: email,
				};
			},
		}),
		verifyOtp: builder.mutation({
			query: (otpData) => {
				return {
					url: '/otp/verify-otp',
					method: 'POST',
					data: otpData,
				};
			},
		}),
	}),
});

export const {useSendOtpMutation, useVerifyOtpMutation} = otpApi;
