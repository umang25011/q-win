import React from "react"
import { EventDetails } from "../manageEvent/manageEventSlice"
import "./eventCard.css"

export default function EventCard({ event }: { event: EventDetails }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">{event.title}</h2>
      </div>
      <div className="card-body">
        <p className="card-description">{event.description}</p>
        <button className="register-btn">Register</button>
      </div>
    </div>
  )
}
