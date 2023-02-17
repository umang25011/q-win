import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"

export const initialEventsList: EventDetails[] = []

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  try {
    const eventsSnapshot = await getDocs(collection(firestoreV9, FIREBASE_COLLECTIONS.event))

    const events: EventDetails[] = []
    eventsSnapshot.forEach((doc) => {
      const data = doc.data()
      events.push({
        id: doc.id,
        title: data.title,
        description: data.description,
      })
    })
    dispatch(setEventsList(events))
    // success
  } catch (error) {
    // error
  }
}

export const eventsListSlicer = createSlice({
  name: "Event List",
  initialState: initialEventsList,
  reducers: {
    setEventsList: (state, action: PayloadAction<EventDetails[]>) => {
      return [...action.payload]
    },
  },
})

export const { setEventsList } = eventsListSlicer.actions
export default eventsListSlicer.reducer
