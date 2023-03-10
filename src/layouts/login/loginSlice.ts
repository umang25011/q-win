import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { getAuth, getRedirectResult } from "firebase/auth"
import firebase from "firebase/compat"
import { doc } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestore, firestoreV9 } from "../../config/IntialiseFirebase"
import { LOCAL_STORAGE } from "../../config/localStorage"
import { AppDispatch } from "../../store/store"
import { initialUserProfile, UserDetails } from "../profile/profileSlice"

const initialState: UserDetails = initialUserProfile

const getUserFirestore = (userID: string) => (dispatch: AppDispatch) => {}

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
            const user: UserDetails = { ...initialUserProfile }
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
    storeUser: (state, action: PayloadAction<undefined | UserDetails>) => {
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
    storeUserLocal: (state, action: PayloadAction<UserDetails>) => {
      LOCAL_STORAGE.storeUser(action.payload)
      state = action.payload
      return { ...state }
    },
    getUserLocal: (state) => {
      const user = LOCAL_STORAGE.getUser()
      if (user) {
        return { ...user }
      }
    },
    getUserFirebase: (state, action: PayloadAction<{ userID: string }>) => {
      const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, action.payload.userID)
    },
  },
})

export const {
  loginError,
  loginSuccess,
  loginWithMicrosoft,
  storeUser,
  getUserLocal,
  storeUserLocal,
} = loginSlice.actions

export default loginSlice.reducer
