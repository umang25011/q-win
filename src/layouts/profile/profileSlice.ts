import { createSlice } from "@reduxjs/toolkit"

export interface UserProfile {
    name: string, 
    email: string, 
    program: string, 
    mobileNo: string,
    userID: string,
    studentID: string
}

export const initialUserProfile: UserProfile = {
    name: "",
    email: "",
    userID: "",
    mobileNo: "",
    program: "",
    studentID: "",
  }
