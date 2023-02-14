import React from "react"
import { useEffect } from "react"
import { Card, Form } from "semantic-ui-react"
import { useAppSelector } from "../../store/store"
import "./profile.css"

export default function Profile() {
  const user = useAppSelector((store) => store.login)

  useEffect(() => {}, [])

  return (
    <div className="form">
      <div className="title">Welcome</div>
      <div className="subtitle">Let's create your account!</div>
      <div className="input-container ic1">
        <input id="firstname" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label htmlFor="firstname" className="placeholder">
          First name
        </label>
      </div>
      <div className="input-container ic2">
        <input id="lastname" className="input" type="text" placeholder=" " />
        <div className="cut"></div>
        <label htmlFor="lastname" className="placeholder">
          Last name
        </label>
      </div>
      <div className="input-container ic2">
        <input id="email" className="input" type="text" placeholder=" " />
        <div className="cut cut-short"></div>
        <label htmlFor="email" className="placeholder">
          Email
        </label>
      </div>
      <button className="submit">submit</button>
    </div>
  )
}
