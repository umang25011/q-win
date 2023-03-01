import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch, useAppSelector } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"
import { UserDetails } from "../profile/profileSlice"

export const initialEventsList: EventDetails[] = []

export const fetchEvents = () => async (dispatch: AppDispatch) => {
  try {
    const eventsSnapshot = await getDocs(collection(firestoreV9, FIREBASE_COLLECTIONS.events))

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

export const registerEvent = (event: EventDetails, user: UserDetails) => async (dispatch: AppDispatch) => {
  try {
    const eventRef = doc(firestoreV9, FIREBASE_COLLECTIONS.events, event.id)
    const attendeesRef = doc(eventRef, FIREBASE_COLLECTIONS.eventsSubAttendees, user.userID)
    await setDoc(attendeesRef, {
      name: user.name,
      email: user.email,
    })
    const userRef = doc(firestoreV9, FIREBASE_COLLECTIONS.users, user.userID)
    const userEventsRef = doc(userRef, FIREBASE_COLLECTIONS.usersSubEvent, event.id)
    await setDoc(userEventsRef, {
      event: event.title,
      link: `https://qwin.web.app/events/${event.id}`,
    })
    console.log("Event Registered Successfully")
  } catch (e) {
    console.log(e)
  }
}

export const eventsListSlice = createSlice({
  name: "Event List",
  initialState: initialEventsList,
  reducers: {
    setEventsList: (state, action: PayloadAction<EventDetails[]>) => {
      return [...action.payload]
    },
    registerForEvent: (
      state,
      action: PayloadAction<{ eventID: string; userID: string; name: string; email: string }>
    ) => {},
  },
})

export const { setEventsList, registerForEvent } = eventsListSlice.actions
export default eventsListSlice.reducer
