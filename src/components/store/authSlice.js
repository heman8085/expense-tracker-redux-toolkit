import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {
    displayName: "",
    email: "",
    photoUrl: "",
  },
  loading: false,
  error: null,
  verificationSent: false,
  isUpdateProfile: false,
};

//login
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, {rejectWithValue}) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.message);
      }
      const data = await response.json();
      console.log("login post response:", data);
      const user = {
        idToken: data.idToken,
        localId: data.localId,
        email: data.email,
      };
      localStorage.setItem("user", JSON.stringify(user));

     
      const profileResponse = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: user.idToken,
          }),
        }
      );
      if (!profileResponse.ok) {
        console.error("Error fetching user profile data");
      } else {
        const profileData = await profileResponse.json();
        user.displayName = profileData.users[0].displayName;
        user.photoUrl = profileData.users[0].photoUrl;
        localStorage.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//signup
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY",
        {
          method: "POST",
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.message);
      }
      const data = await response.json();
      console.log("signup post response:", data);
      const user = {
        idToken: data.idToken,
        localId: data.localId,
        email: data.email,
      };
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//email verify
export const sendVerificationEmail = createAsyncThunk(
  "auth/sendVerificationEmail",
  async (_, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: user.idToken,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.message);
      }
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//update user profile
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ fullName, profilePhoto }, { getState, rejectWithValue }) => {
    try {
      const user = getState().auth.user;
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCFNqv0lS8OrTfqM59R86Mrjo0RkGnWdXY`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken: user.idToken,
            displayName: fullName,
            photoUrl: profilePhoto,
            returnSecureToken: true,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.error.message);
      }
      const data = await response.json();
      const updatedUser = {
        ...user,
        displayName: data.displayName,
        photoUrl: data.photoUrl,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleUpdateProfile(state) {
      state.isUpdateProfile = !state.isUpdateProfile;
    },
    logout(state) {
      localStorage.removeItem("user");
      state.user = { displayName: "", email: "", photoUrl: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendVerificationEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationEmail.fulfilled, (state) => {
        state.loading = false;
        state.verificationSent = true;
      })
      .addCase(sendVerificationEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleUpdateProfile, logout } = authSlice.actions;
export default authSlice.reducer;
