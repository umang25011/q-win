import { createSlice } from "@reduxjs/toolkit"

export interface UserDetails {
    name: string, 
    email: string, 
    program: string, 
    mobileNo: string,
    userID: string,
    studentID: string
}

export const initialUserProfile: UserDetails = {
    name: "",
    email: "",
    userID: "",
    mobileNo: "",
    program: "",
    studentID: "",
  }
