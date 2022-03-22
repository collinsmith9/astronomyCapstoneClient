
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { deleteEvent, deleteEventLike, getEvents, getUsersEventLikes, likeEvent } from "./eventManager";


function EventFeed() {
    const [events, setEvents] = useState([])
    const history = useHistory()
    const user = +localStorage.getItem("astronomer")
    const [usersEventLikes, setUsersEventLikes] = useState([])

    useEffect(() => {getEvents().then(setEvents)},[])

    useEffect(() => {getUsersEventLikes(user).then(setUsersEventLikes)},[])

    function syncEvents() {
        getEvents().then(setEvents)
    }

    const approvedEvents = events.filter((event) => {
        if (event.is_approved) {
            return true
        }
        return false
    })

    function syncUsersEventLikes() {
        getUsersEventLikes(user).then(setUsersEventLikes)
    }
    
    function handleEventLike(event) {
        
        const x = usersEventLikes.find((eventLike) => {
            if (+eventLike.event?.id === +event.id) {
                return true
            }
            return false
        })

        function likeTheEvent() {
            const likeObj = {
                event: event.id,
                user: user
            }
            likeEvent(likeObj).then(() => {syncUsersEventLikes()})
        }

        function unlikeTheEvent() {
            deleteEventLike(x.id).then(() => {syncUsersEventLikes()})
        }

        x
        ? unlikeTheEvent()
        : likeTheEvent()
    }


    return (
        <>
        <h1>Event Feed</h1>
        <button onClick={() => {history.push("/newevent")}}>New Event</button>

        {
            approvedEvents.map((event) => {
                return <fieldset key={event.id}>
                    <Link to={`/events/${event.id}`}>
                    <div>
                        <p>Posted by: {event.user?.user?.first_name} {event.user?.user?.last_name}</p>
                        <p>Event Type: {event.event_type?.event_type}</p>
                        <p>Description: {event.description}</p>
                        <p>Seen from: {event.seen_from}</p>
                        <div><img src={`http://localhost:8000${event.event_pic}`} alt="hello" /></div>
                    </div></Link>
                    {
                        JSON.parse(localStorage.getItem('isStaff')) === true
                        ? <button onClick={() => {
                            deleteEvent(event.id).then(syncEvents)
                        }}>Delete Event</button>
                        : ""
                    }
                     <button onClick={() => {handleEventLike(event)}}>{
                        usersEventLikes.find((eventLike) => {
                            if (+eventLike.event?.id === +event.id) {
                                return true
                            }
                            return false
                        })
                        ? "Unlike"
                        : "Like"
                        // didUserLike(event)
                        // ? "Unlike"
                        // : "Like"
                    }</button>
                </fieldset>
            }).reverse()
        }

        </>
    )
}

export default EventFeed;
