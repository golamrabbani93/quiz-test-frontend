import type {Question} from '../../../types/assessment';
import type {TResponseRedux} from '../../../types/global';

import {baseApi} from '../api/baseApi';

const assessmentAPi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllQuestion: builder.query({
			query: () => {
				return {
					url: '/question',
					method: 'GET',
					params: {},
				};
			},
			providesTags: [],
			transformResponse: (response: TResponseRedux<Question[]>) => {
				return response?.data || [];
			},
		}),
	}),
});

export const {useGetAllQuestionQuery} = assessmentAPi;
