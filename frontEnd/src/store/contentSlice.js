import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: null,
    loading: false,
    error: null,
};

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContent(state, action) {
            state.data = action.payload;
            state.loading = false;
            state.error = null;
        },
        setContentLoading(state) {
            state.loading = true;
            state.error = null;
        },
        setContentError(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setContent, setContentLoading, setContentError } = contentSlice.actions;
export default contentSlice.reducer;
