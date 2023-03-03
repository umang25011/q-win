import React from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/store"
import { EventDetails } from "../manageEvent/manageEventSlice"
import "./eventCard.css"
import { registerEvent } from "./eventsListSlice"

export default function EventCard({ event }: { event: EventDetails }) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector((state) => state.login)
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{event.title}</h2>
      </div>
      <div className="card-body">
        <p className="card-description">{event.description}</p>
        <button
          className="register-btn"
          onClick={(e) => {
            dispatch(registerEvent(event, user))
          }}
        >
          Register
        </button>
        <button
          className="attendance-btn"
          onClick={(e) => {
            navigate("/start-verification", { state: event })
          }}
        >
          Start Verification
        </button>
      </div>
    </div>
  )
}
