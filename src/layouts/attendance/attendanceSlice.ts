import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, doc, getDoc } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"

export interface Attendance {
  hash: string
  randomString: string
  event: EventDetails
}
export const initialAttendance: Attendance = {
  hash: "",
  randomString: "",
  event: ("" as unknown) as EventDetails, // this field will never be empty, there has to an event to order to take attendance
}

export const generateRandomString = (event: EventDetails) => async (dispatch: AppDispatch) => {
  try {
    const eventRef = await doc(firestoreV9, FIREBASE_COLLECTIONS.events, event.id)
    const privateCollectionRef = await doc(
      eventRef,
      FIREBASE_COLLECTIONS.eventsPrivate,
      FIREBASE_COLLECTIONS.eventsRandomStringDocument
    )
    const privateDataSnap = await getDoc(privateCollectionRef)
    if (privateDataSnap.exists()) {
      console.log(privateDataSnap.data())
    }
  } catch (e) {}
}

export const attendanceSlice = createSlice({
  name: "Attadance Slice",
  initialState: initialAttendance,
  reducers: {
    storeRandomString: (state, action: PayloadAction<{ randomString: string }>) => {
      state.randomString = action.payload.randomString
    },
  },
})
