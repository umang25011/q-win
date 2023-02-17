import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { collection, doc, setDoc } from "firebase/firestore"
import { toastr } from "react-redux-toastr"
import { firestore, firestoreV9 } from "../../config/IntialiseFirebase"

export interface EventDetails {
  id: string
  title: string
  description: string
}

export const initialEventDetails: EventDetails = {
  id: "",
  title: "",
  description: "",
}

export const manageEventSlice = createSlice({
  name: "Manage Events",
  initialState: initialEventDetails,
  reducers: {
    storeEvent: (state, action: PayloadAction<EventDetails>) => {
      // firestore.collection("events").add(action.payload)
      setDoc(doc(collection(firestoreV9, "events")), action.payload)
        .then((res) => {
          console.log(res)
        })
        .catch((error) => {})
    },
  },
})

export const { storeEvent } = manageEventSlice.actions

export default manageEventSlice.reducer
