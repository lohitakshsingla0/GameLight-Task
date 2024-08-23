import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '01964fa8-f0e5-40fc-a13b-9f5c3a5415f3';
const API_URL = 'https://mock-game-api-9a408f047f23.herokuapp.com/api/games';

// Thunk to fetch the list of games
export const fetchGames = createAsyncThunk('games/fetchGames', async () => {
  const response = await axios.get(API_URL, {
    headers: {
      'X-API-Key': API_KEY,
    },
  });
  return response.data;
});

// Thunk to fetch details of a specific game by its ID
export const fetchGameDetails = createAsyncThunk('games/fetchGameDetails', async (gameId: string) => {
  const response = await axios.get(`${API_URL}/${gameId}`, {
    headers: {
      'X-API-Key': API_KEY,
    },
  });
  return response.data;
});

const gamesSlice = createSlice({
  name: 'games',
  initialState: {
    gamesList: [],
    gameDetails: null, // To store the details of a selected game
    favourites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter(game => game.id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchGames.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGames.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.gamesList = action.payload;
        })
        .addCase(fetchGames.rejected, (state, action) => {
          state.status = 'failed';
          // @ts-ignore
          state.error = action.error.message;
        })
        // Handling fetchGameDetails cases
        .addCase(fetchGameDetails.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchGameDetails.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.gameDetails = action.payload;
        })
        .addCase(fetchGameDetails.rejected, (state, action) => {
          state.status = 'failed';
          // @ts-ignore
          state.error = action.error.message;
        });
  },
});

export const { addFavourite, removeFavourite } = gamesSlice.actions;
export default gamesSlice.reducer;
