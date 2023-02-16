import { UserProfile } from "../layouts/profile/profileSlice"

export interface LocalStorageKeys {
  user: "user"
}

export function storeUser(user: UserProfile) {
  localStorage.setItem("user", JSON.stringify(user))
}

export function getUser() {
  try {
    let tempData = localStorage.getItem("user")
    if (tempData) {
      tempData = JSON.parse(tempData)
      return (tempData as unknown) as UserProfile
    }
    return null
  } catch (error) {
    return null
  }
}

export const LOCAL_STORAGE = { storeUser, getUser }
