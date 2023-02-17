import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEvents } from "./eventsListSlice"
import { useAppDispatch, useAppSelector } from "../../store/store"
import "./eventsList.css"
import EventCard from "./EventCard"
import { EventDetails } from "../manageEvent/manageEventSlice"

const EventList = () => {
  const dispatch = useAppDispatch()
  const events = useAppSelector((state) => state.eventsList)

  useEffect(() => {
    // dispatch(fetchEvents())
  }, [dispatch])

  useEffect(() => {
    console.log(events)
  }, [events])

  return (
    <div className="event-list">
      <h1>Upcoming Events</h1>
      {/* {events.length === 0 && <p>No events found.</p>} */}
      <ul>
        {[
          {
            id: "5IBHvxyLcONubTSazrwb",
            title: "Test",
            description: "Test",
          },
          {
            id: "9VpGpvGLzhAdnKh5kBlg",
            title: "Test",
            description: "Test",
          },
          {
            id: "GmOUnLfApJcsiPFrLhWN",
            title: "Auto",
          },
          {
            id: "UlESbuXVBpHmZqztt103",
            title: "Test",
            description: "Test",
          },
          {
            id: "gBjp815hR3YvOQAS4LBe",
            title: "est",
            description: "test",
          },
          {
            id: "yzneTy0VSJ6Kb5Ad198j",
            title: "Test",
            description: "Test",
          },
        ].map((event) => (
          <li key={event.id}>
            <EventCard event={event as EventDetails}/>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventList
