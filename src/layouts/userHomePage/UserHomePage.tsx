import React, { useEffect, useState } from "react"
import CheckIfAdmin from "../../config/CheckIfAdmin"
import { checkIfAdmin } from "../../config/helper"
import EventList from "../eventsList/EventsList"
import Header from "../header/Header"
import "./userHomePage.css"

export default function UserHomePage() {
  const [selectedView, setSeletectedView] = useState<"event" | "myEvent">("event")

  useEffect(() => {}, [])
  return (
    <div>
      <Header />
      <div className="button-container">
        <button
          id={`upcoming-events-btn`}
          className={`${selectedView === "event" ? "button-active" : ""}`}
          onClick={(e) => setSeletectedView("event")}
        >
          Events
        </button>
        <div className="separator"></div>
        <button
          id={`my-events-btn`}
          className={`${selectedView === "myEvent" ? "button-active" : ""}`}
          onClick={(e) => setSeletectedView("myEvent")}
        >
          My Bookings
        </button>
      </div>

      <div id="event-list-container">
        {selectedView === "event" ? (
          <ul id="upcoming-events-list">
            <EventList />
          </ul>
        ) : (
          <ul id="my-events-list"></ul>
        )}
      </div>
    </div>
  )
}
