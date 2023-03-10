import React, { useState } from "react"
import { useEffect } from "react"
import { redirect } from "react-router-dom"
import { Card, Dropdown, Form } from "semantic-ui-react"
import { SelectOption, TextInput } from "../../config/FormComponents"
import { store, useAppDispatch, useAppSelector } from "../../store/store"
import { getUserLocal, storeUser } from "../login/loginSlice"
import "./profile.css"
import { initialUserProfile, UserDetails } from "./profileSlice"

export default function Profile() {
  const globalUser = useAppSelector((store) => store.login)
  const [user, setUser] = useState<UserDetails>(globalUser)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getUserLocal())
  }, [])

  useEffect(() => {
    if (globalUser.email) {
      setUser(globalUser)
    }
    console.log("Global User", globalUser)
  }, [globalUser])

  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(storeUser(user))
      }}
    >
      {/* <div className="title">Complete User </div> */}
      <div className="subtitle">Please Complete Your Details</div>
      <TextInput
        label="Student ID"
        value={user.studentID}
        setValue={(val) => setUser({ ...user, studentID: val })}
        extra={{
          pattern: "[0-9]{9}",
          maxLength: 9,
          required: true,
          // @ts-ignore
          onInvalid: (e) => e.target.setCustomValidity("Please Enter Your 9 Digit Student ID (e.g 123456789)"),
          // @ts-ignore
          onInput: (e) => e.target.setCustomValidity(""),
        }}
      />
      <TextInput
        label="Phone No"
        value={user.mobileNo}
        setValue={(val) => setUser({ ...user, mobileNo: val })}
        extra={{ pattern: "[0-9]{10}", maxLength: 10, required: true }}
      />
      <SelectOption setValue={(val) => setUser({ ...user, program: val })} />

      <button className="submit" type="submit" style={{ marginTop: "3em" }}>
        Finish
      </button>
    </form>
  )
}
