// store/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


//dohvat svih korisnika
export const loadUser = createAsyncThunk("user/loadUser", async () => {
  const res = await fetch("/api/auth/protect");
  if (!res.ok) throw new Error("Unauthorized");
  return await res.json(); // { email, isAdmin }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: null,
    isAdmin: false,
    
  },
  reducers: {
    setUser: (state, action) => {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    },
    logout: (state) => {
      state.email = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    // kada je učitavanje korisnika u toku
  
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.email = action.payload.email;
      state.isAdmin = action.payload.isAdmin;
    });
    // ako je došlo do greške prilikom učitavanja korisnika
    // postavi email i isAdmin na null
    builder.addCase(loadUser.rejected, (state) => {
      state.email = null;
      state.isAdmin = false;
    });
  },
});


export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
