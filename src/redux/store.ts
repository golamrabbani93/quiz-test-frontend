import {configureStore} from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
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
const persistConfig = {
	key: 'root',
	storage,
};
// Persist only authApi reducer's cache is not recommended; better to persist separate auth slice if you have one
// But RTK Query cache is ephemeral, so usually no persist for RTK Query slices

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
	reducer: {
		auth: persistedAuthReducer,
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
