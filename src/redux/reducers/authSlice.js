import { createSlice } from "@reduxjs/toolkit";

// Funzione per rimuovere il token e l'utente dal localStorage e dallo stato
const removeAuthData = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  return {
    token: null,
    user: null,
  };
};

const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));

      // Imposta un timeout per il logout dopo 60 minuti
      state.logoutTimer = setTimeout(() => {
        state = removeAuthData();
        state.logoutTimer = null;
      }, 60 * 60 * 1000); // 60 minuti
    },
    logout(state) {
      state = removeAuthData();
      if (state.logoutTimer) {
        clearTimeout(state.logoutTimer); // Cancella il timeout se l'utente effettua il logout manualmente
        state.logoutTimer = null;
      }
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
