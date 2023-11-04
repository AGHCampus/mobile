import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
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

interface AppState {
    userApiKey: string | null;
    username: string | null;
}
const initialState: AppState = {
    userApiKey: null,
    username: null,
};

const persistConfig = {
    key: 'root',
    version: 1,
    storage: AsyncStorage,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setUserApiKey: (state, action: PayloadAction<string>) => {
            state.userApiKey = action.payload;
        },
        logout: state => {
            state.username = null;
            state.userApiKey = null;
        },
    },
});

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { setUsername, setUserApiKey, logout } = userSlice.actions;

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export const persistor = persistStore(store);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
