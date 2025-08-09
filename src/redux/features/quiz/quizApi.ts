import type {TResponseRedux} from '../../../types/global';
import type {IQuiz} from '../../../types/quiz';
import {baseApi} from '../api/baseApi';

const quizApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		getAllQuiz: builder.query({
			query: () => {
				return {
					url: '/question',
					method: 'GET',
					params: {},
				};
			},
			providesTags: [],
			transformResponse: (response: TResponseRedux<IQuiz[]>) => {
				return response?.data || [];
			},
		}),
	}),
});

export const {useGetAllQuizQuery} = quizApi;
