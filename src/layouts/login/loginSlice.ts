import { AnyAction, createSlice, Dispatch, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit"
import { getAuth, getRedirectResult } from "firebase/auth"
import firebase from "firebase/compat"
import { act } from "react-dom/test-utils"
import { redirect } from "react-router-dom"
import { firestore } from "../../config/IntialiseFirebase"
import { LOCAL_STORAGE } from "../../config/localStorage"
import { useAppDispatch } from "../../store/store"
import { initialUserProfile, UserProfile } from "../profile/profileSlice"

const initialState: UserProfile = initialUserProfile

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
            const user: UserProfile = { ...initialUserProfile }
            user.name = result.user.displayName || ""
            user.email = result.user.email || ""
            user.userID = result.user.uid
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
                  state = user
                  LOCAL_STORAGE.storeUser(user)
                  window.location.href = "/profile"
                })
            }
          }
        })
        .catch((error: any) => {
          // Handle error.
          console.log(error)
        })
    },
    loginError: (state) => {
      // Login Failed
    },
    loginSuccess: (state) => {
      // Login Successful
    },
    storeUser: (state, action: PayloadAction<undefined | UserProfile>) => {
      if (action.payload) {
        state = action.payload
        console.log(action.payload)

        firestore
          .collection("users")
          .doc(action.payload.userID)
          .set(action.payload, { merge: true })
          .then((res) => {
            window.location.href = "/events"
          })
      }
      LOCAL_STORAGE.storeUser(state)
    },
    getUser: (state) => {
      const user = LOCAL_STORAGE.getUser()
      if (user) {
        return { ...user }
      }
    },
  },
})

export const { loginError, loginSuccess, loginWithMicrosoft, storeUser, getUser } = loginSlice.actions

export default loginSlice.reducer
