import { createSlice, configureStore, PayloadAction } from '@reduxjs/toolkit';
import type { TypedUseSelectorHook } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';

// TODO: Persistence and proper storing of user data

interface AppState {
    userApiKey: string | null;
    username: string | null;
}
const initialState: AppState = {
    userApiKey: null,
    username: null,
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

export const { setUsername, setUserApiKey, logout } = userSlice.actions;

const store = configureStore({
    reducer: userSlice.reducer,
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
