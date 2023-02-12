import { createSlice } from "@reduxjs/toolkit"
import { getAuth, getRedirectResult } from "firebase/auth"
import firebase from "firebase/compat"
import { firestore } from "../../config/IntialiseFirebase"

export interface LoginState {
  authError: string | null
  name: string
  email: string
  userID: string
}

const initialState: LoginState = {
  authError: "Login Required",
  name: "",
  email: "",
  userID: "",
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginWithMicrosoft: (state) => {
      const auth = getAuth()

      getRedirectResult(auth)
        .then((result) => {
          // User is signed in.
          // IdP data available in result.additionalUserInfo.profile.
          // Get the OAuth access token and ID Token
          if (result) {
            console.log(result)

            const user: LoginState = {
              name: result.user.displayName || "",
              email: result.user.email || "",
              userID: result.user.uid,
              authError: "",
            }

            // validate user object
            if (user.name && user.email && user.userID) {
              firestore
                .collection("users")
                .doc(result.user.uid)
                .set(
                  {
                    name: user.name,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                    email: user.email,
                    userID: user.userID,
                  },
                  { merge: true }
                )
                .then((res) => {
                  window.location.href = "/events"
                })
            }
          }
        })
        .catch((error: any) => {
          // Handle error.
        })
    },
    loginError: (state) => {
      state.authError = "Login Failed"
    },
    loginSuccess: (state) => {
      state.authError = null
    },
  },
})

export const { loginError, loginSuccess, loginWithMicrosoft } = loginSlice.actions

export default loginSlice.reducer
