import { createSlice } from "@reduxjs/toolkit"
import { collection } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { UserDetails } from "../profile/profileSlice"

export interface Dashboard {
  users: UserDetails[]
}

export const initialDashboard: Dashboard = {
  users: [],
}

export const getAllUsers = () => async (dispath: AppDispatch) => {
  try {
    const userSnapShot = collection(firestoreV9, FIREBASE_COLLECTIONS.users)

    const users: Dashboard["users"] = []
    
  } catch (error) {
    
  }
}

export const dashboardSlice = createSlice({
  name: "Dashboard",
  initialState: initialDashboard,
  reducers: {
    storeAllUsers: (state, action) => {},
  },
})

export default dashboardSlice.reducer

const { storeAllUsers } = dashboardSlice.actions
