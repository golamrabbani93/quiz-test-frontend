import {createApi} from '@reduxjs/toolkit/query/react';
import {customBaseQueryWithRefreshToken} from './customBaseQueryWithRefreshToken';
export const baseApi = createApi({
	reducerPath: 'baseApi',
	baseQuery: customBaseQueryWithRefreshToken,
	tagTypes: [],
	endpoints: () => ({}),
});
