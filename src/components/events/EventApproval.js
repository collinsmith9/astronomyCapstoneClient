
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { approveEvent, deleteEvent, getEvents } from "./eventManager";


function EventApproval() {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const user = +localStorage.getItem("astronomer")

    useEffect(() => {getEvents().then(setEvents)},[])

    const nonApprovedEvents = events.filter((event) => {
        if (!event.is_approved) {
            return true
        }
        return false
    })
    


    return (
        <>
        <h1>Admin Approve Events</h1>

        {
            nonApprovedEvents.map((event) => {
                return <fieldset key={event.id}>
                    <div>
                        <p>Posted by: {event.user?.user?.first_name} {event.user?.user?.last_name}</p>
                        <p>Event Type: {event.event_type?.event_type}</p>
                        <p>Description: {event.description}</p>
                        <p>Seen from: {event.seen_from}</p>
                        <div><img src={`http://localhost:8000${event.event_pic}`} alt="hello" /></div>
                        <button onClick={() => {
                            approveEvent(event.id).then(() => {history.push("/events")})
                        }}>Approve</button><button onClick={() => {
                            deleteEvent(event.id).then(() => {history.push("/events")})
                        }}>Disapprove</button>
                    </div>
                </fieldset>
            })
        }

        </>
    )
}

export default EventApproval;