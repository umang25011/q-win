import React, { useState } from "react"
import { useEffect } from "react"
import { redirect } from "react-router-dom"
import { Card, Dropdown, Form } from "semantic-ui-react"
import { SelectOption, TextInput } from "../../config/FormComponents"
import { store, useAppDispatch, useAppSelector } from "../../store/store"
import { storeUser } from "../login/loginSlice"
import "./profile.css"
import { initialUserProfile, UserProfile } from "./profileSlice"

export default function Profile() {
  const globalUser = useAppSelector((store) => store.login)
  const [user, setUser] = useState<UserProfile>(initialUserProfile)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (globalUser.email) {
      setUser(globalUser)
    }
  }, [globalUser])

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      {/* <div className="title">Complete User </div> */}
      <div className="subtitle">Please Complete Your Details</div>
      <TextInput
        label="Student ID"
        value={user.studentID}
        setValue={(val) => setUser({ ...user, studentID: val })}
        extra={{ pattern: "[0-9]{9}", maxLength: 9, required: true }}
      />
      <TextInput
        label="Phone No"
        value={user.mobileNo}
        setValue={(val) => setUser({ ...user, mobileNo: val })}
        extra={{ pattern: "[0-9]{9}", maxLength: 9, required: true }}
      />
      <SelectOption setValue={(val) => setUser({ ...user, program: val })} />

      <button
        className="submit"
        style={{ marginTop: "3em" }}
        onClick={() => {
          dispatch(storeUser(user))
          // dispatch(setUserProfileComplete(true))
        }}
      >
        Finish
      </button>
    </form>
  )
}
