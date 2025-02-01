import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface TourType {
    _id: string;
    tour_number: string;
    checkIn_date: string;
    checkOut_date: string;
    tour_duration: string;
    tour_availability: boolean;
    tour_space: number;
    createdAt: string;
    updatedAt: string;
    tour_id: string;
}

// 📌 Async thunk za dohvaćanje tura
export const fetchTours = createAsyncThunk("tours/fetchTours", async () => {
    const res = await fetch("/api/tours");
    return res.json();
});

interface TourState {
    tours: TourType[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: TourState = {
    tours: [],
    status: "idle",
};

const tourSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTours.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tours = action.payload;
            })
            .addCase(fetchTours.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default tourSlice.reducer;
