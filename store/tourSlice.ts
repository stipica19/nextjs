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

//  Async thunk za dohvaćanje svih tura
export const fetchTours = createAsyncThunk("tours/fetchTours", async () => {
    const res = await fetch("/api/tours");
    return res.json();
});

// Definicija stanja (state) za slice
interface TourState {
    tours: TourType[];
    status: "idle" | "loading" | "succeeded" | "failed";
}

// pocetno stanje za tours slic-e
const initialState: TourState = {
    tours: [],
    status: "idle",
};
// kreiranje slice-a za ture pomoccu redux toolkit-a
const tourSlice = createSlice({
    name: "tours",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTours.pending, (state) => {
                // kada zahtjev krene, status postaje "loading"
                state.status = "loading";
            })
            .addCase(fetchTours.fulfilled, (state, action) => {
                  // Kada se dohvat uspješno završi 
                state.status = "succeeded";
                state.tours = action.payload;
            })
            .addCase(fetchTours.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default tourSlice.reducer;
