import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk pour la connexion utilisateur
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    console.log("User data sent to API:", userData);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        userData
      );
      console.log("Response from login API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in loginUser thunk:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour récupérer les données utilisateur
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchUserProfile",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Get the token
    console.log("Fetching user profile with token:", token);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/profile",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response from fetchUserProfile API:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error in fetchUserProfile thunk:", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour mettre à jour le profil utilisateur
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (updatedData, { getState, rejectWithValue }) => {
    const { token } = getState().auth; // Get the token
    try {
      const response = await axios.put(
        "http://localhost:3001/api/v1/user/profile",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data.body;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initialisation du store, état initial
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    status: "idle",
    error: null,
  },
  // Reducers de déconnexion
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.status = "idle";
      state.error = null;
      console.log("User logged out. State reset to initial values.");
    },
  },
  // Gestion des différents états
  extraReducers: (builder) => {
    builder
      // Gestion de l'état de la requête de connexion de l'utilisateur
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        console.log("Login request pending...");
      })
      // Cas si connexion réussie
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log("Full response payload:", action.payload);
        state.status = "succeeded";
        // Vérification de la structure des données
        if (action.payload.body) {
          state.user = action.payload.body.user;
          state.token = action.payload.body.token; // État du token
          console.log("Login succeeded. User data:", state.user);
          console.log("Token received:", state.token);
        } else {
          console.error("Unexpected response structure:", action.payload);
        }
      })
      // Cas si connexion échoue
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        // Réinitialise user et token en cas d'échec
        state.user = null;
        state.token = null;
        console.error("Login failed with error:", state.error);
      })
      // Gestion de l'état de la requête de récupération du profil utilisateur
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = "loading";
        console.log("Fetch user profile request pending...");
      })
      // Cas si le profil est bien récupéré
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("Full response payload from profile fetch:", action.payload);
        state.status = "succeeded";
        // Vérifie que les données existent et sont bien structurées
        if (action.payload.body) {
          state.user = action.payload.body.user;
          console.log("User profile fetched successfully. User data:", state.user);
        } else {
          console.error("Unexpected response structure:", action.payload);
        }
      })
      // Cas si la récupération du profil échoue
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Failed to fetch user profile with error:", state.error);
      })
      // Cas si la mise à jour du profil réussie
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        // Mettre à jour les informations de l'utilisateur dans le state
        state.user = { ...state.user, ...action.payload };
        state.status = "succeeded";
      })
      // Cas si la mise à jour du profil échoue
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
