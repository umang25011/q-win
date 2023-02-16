import React, { useState } from "react"
import { toastr } from "react-redux-toastr"
import { useAppDispatch } from "../../store/store"
import "./manageEvent.css"
import { EventDetails, initialEventDetails, storeEvent } from "./manageEventSlice"

export default function ManageEvents() {
  const [event, setEvent] = useState<EventDetails>(initialEventDetails)
  const dispatch = useAppDispatch()
  const disableCloseButtonFocus = true
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        dispatch(storeEvent(event))
        toastr.success(`${event.title} Created`, "Event Created Successfully")
      }}
    >
      <h3>Create Event</h3>
      <ul className="form-style-1">
        <li>
          <label>
            Title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="field3"
            className="field-long"
            value={event.title}
            onChange={(e) => setEvent({ ...event, title: e.target.value })}
          />
        </li>

        <li>
          <label>
            Details <span className="required">*</span>
          </label>
          <textarea
            name="field5"
            id="field5"
            className="field-long field-textarea"
            value={event.description}
            onChange={(e) => setEvent({ ...event, description: e.target.value })}
          ></textarea>
        </li>
        <li>
          <input type="submit" value="Create" />
        </li>
      </ul>
    </form>
  )
}
