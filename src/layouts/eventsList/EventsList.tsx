import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "./eventsListSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import "./eventsList.css"
import EventCard from "./EventCard"
import { EventDetails } from "../manageEvent/manageEventSlice"
import firebase from "firebase/compat"

const EventList = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector((state) => state.eventsList)

  useEffect(() => {
    dispatch(fetchEvents())
  }, [dispatch])

  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      {events && events.length === 0 && <p>No events found.</p>}
      <ul>
        {events
          ? events.map((event) => (
              <li key={event.id}>
                <EventCard event={event as EventDetails} />
              </li>
            ))
          : null}
      </ul>
    </div>
  )
}

export default EventList
