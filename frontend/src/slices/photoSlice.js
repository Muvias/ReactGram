import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import photoService from "../services/photoService";

const initialState = {
    photos: [],
    photo: {},
    error: false,
    success: false,
    loading: false,
    message: null
};

export const publishPhoto = createAsyncThunk(
    "photo/publish",
    async (photo, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.publishPhoto(photo, token)

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    },
);

export const getUserPhotos = createAsyncThunk(
    "photo/userphotos",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getUserPhotos(id, token);

        return data;
    },
);

export const deletePhoto = createAsyncThunk(
    "photo/delete",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = photoService.deletePhoto(id, token);

        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    },
);

export const updatePhoto = createAsyncThunk(
    "photo/update",
    async (photoData, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.updatePhoto({ title: photoData.title }, photoData.id, token);
        
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0]);
        };

        return data;
    },
);

export const getPhoto = createAsyncThunk(
    "photo/getphoto",
    async (id, thunkAPI) => {
        const token = thunkAPI.getState().auth.user.token;

        const data = await photoService.getPhoto(id, token);

        return data;
    },
);

export const photoSlice = createSlice({
    name: "photo",
    initialState,
    reducers: {
        resetMessage: (state) => {
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(publishPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(publishPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.photo = action.payload;
            state.photos.unshift(state.photo);
            state.message = "Foto publicada com sucesso";
        }).addCase(publishPhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(getUserPhotos.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getUserPhotos.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.photos = action.payload;
        }).addCase(deletePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(deletePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.photos = state.photos.filter((photo) => {
                return photo._id !== action.payload.id;
            });
            state.message = action.payload.message;
        }).addCase(deletePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(updatePhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(updatePhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.photos.map((photo) => {
                if(photo._id === action.payload.photo._id) {
                    return photo.title = action.payload.photo.title;
                };
                return photo;
            });
            state.message = action.payload.message;
        }).addCase(updatePhoto.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.photo = {};
        }).addCase(getPhoto.pending, (state) => {
            state.loading = true;
            state.error = false;
        }).addCase(getPhoto.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.error = false;
            state.photo = action.payload;
        });
    }
});

export const { resetMessage } = photoSlice.actions;
export default photoSlice.reducer;