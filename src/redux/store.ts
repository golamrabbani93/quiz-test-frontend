import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import assessmentReducer from './features/assessment/assessmentSlice';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import {setupListeners} from '@reduxjs/toolkit/query';
import {baseApi} from './features/api/baseApi';
const authPersistConfig = {
	key: 'auth',
	storage,
};

const assessmentPersistConfig = {
	key: 'assessment',
	storage,
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);
const persistedAssessmentReducer = persistReducer(assessmentPersistConfig, assessmentReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
		assessment: persistedAssessmentReducer,
		[baseApi.reducerPath]: baseApi.reducer,
	},
	middleware: (getDefaultMiddlewares) =>
		getDefaultMiddlewares({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}).concat(baseApi.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
