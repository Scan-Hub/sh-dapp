import { createSlice } from "@reduxjs/toolkit";
import { fetchCountriesISO, fetchCountriesFlagDial } from "../actions";

const initialState = {
  countriesISO: {
    loading: false,
    items: [],
  },
  countriesFlagDial: {
    loading: false,
    items: [],
  },
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    save(state, action) {
      const { value, key } = action.payload;
      state[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesISO.pending, (state, action) => {
        state.countriesISO.loading = true;
      })
      .addCase(fetchCountriesISO.fulfilled, (state, action) => {
        state.countriesISO.loading = false;
        state.countriesISO.items = action.payload.data;
      })
      .addCase(fetchCountriesISO.rejected, (state, action) => {
        state.countriesISO.loading = false;
      })

      .addCase(fetchCountriesFlagDial.pending, (state, action) => {
        state.countriesFlagDial.loading = true;
      })
      .addCase(fetchCountriesFlagDial.fulfilled, (state, action) => {
        state.countriesFlagDial.loading = false;
        state.countriesFlagDial.items = action.payload.data;
      })
      .addCase(fetchCountriesFlagDial.rejected, (state, action) => {
        state.countriesFlagDial.loading = false;
      });
  },
});

export default countriesSlice.reducer;

export const selectcountriesISO = (state) => state.countries.countriesISO;
export const selectcountriesFlagDial = (state) =>
  state.countries.countriesFlagDial;
