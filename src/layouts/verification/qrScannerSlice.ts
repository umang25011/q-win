// QrScannerSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { doc, setDoc } from "firebase/firestore"
import { FIREBASE_COLLECTIONS } from "../../config/helper"
import { firestoreV9 } from "../../config/IntialiseFirebase"
import { AppDispatch } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"

interface QrScannerState {
  qrCodeData: string | null
  isLoading: boolean
  error: string | null
}

const initialState: QrScannerState = {
  qrCodeData: null,
  isLoading: false,
  error: null,
}

const qrScannerSlice = createSlice({
  name: "qrScanner",
  initialState,
  reducers: {
    scanQrCodeStart(state) {
      state.isLoading = true
      state.error = null
    },
    scanQrCodeSuccess(state, action: PayloadAction<string>) {
      state.qrCodeData = action.payload
      state.isLoading = false
      state.error = null
    },
    scanQrCodeFailure(state, action: PayloadAction<string>) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { scanQrCodeStart, scanQrCodeSuccess, scanQrCodeFailure } = qrScannerSlice.actions

export default qrScannerSlice.reducer

export const uploadVerificationToEvent = (hash: string, eventID: string) => async (dispatch:AppDispatch ) => {
  dispatch(scanQrCodeStart())
  try {
    // Upload the QR code image to Event
    const eventRef = await doc(firestoreV9, FIREBASE_COLLECTIONS.events, eventID)
    const privateCollectionRef = await doc(
      eventRef,
      FIREBASE_COLLECTIONS.eventsPrivate,
      FIREBASE_COLLECTIONS.eventsPrivateVerifiedAttendees
    )
    await setDoc(privateCollectionRef, {})

    dispatch(scanQrCodeSuccess(hash))
  } catch (error: any) {
    dispatch(scanQrCodeFailure(error))
  }
}
