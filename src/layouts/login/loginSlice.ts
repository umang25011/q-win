import { createSlice } from "@reduxjs/toolkit"
import { getAuth, getRedirectResult } from "firebase/auth"
import firebase from "firebase/compat"
import { redirect } from "react-router-dom"
import { firestore } from "../../config/IntialiseFirebase"
import { UserProfile } from "../profile/profileSlice"

const initialState: UserProfile = {
  name: "",
  email: "",
  userID: "",
  mobileNo: "",
  term: "",
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

            const user: UserProfile = {
              name: result.user.displayName || "",
              email: result.user.email || "",
              userID: result.user.uid,
              mobileNo: "",
              term: "",
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
                  redirect("/events")
                })
            }
          }
        })
        .catch((error: any) => {
          // Handle error.
        })
    },
    loginError: (state) => {
      // Login Failed
    },
    loginSuccess: (state) => {
      // Login Successful
    },
  },
})

export const { loginError, loginSuccess, loginWithMicrosoft } = loginSlice.actions

export default loginSlice.reducer
