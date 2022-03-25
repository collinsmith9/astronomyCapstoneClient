import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import EventCommentForm from './EventCommentForm';
import { deleteEvent, deleteEventComment, deleteEventLike, getEventComments, getSingleEvent, getUsersEventLikes, likeEvent } from './eventManager';


function EventDetail() {
    const {eventId} = useParams()
    const [event, setEvent] = useState({})
    const [eventComments, setEventComments] = useState([])
    const [usersEventLikes, setUsersEventLikes] = useState([])
    const [commentForm, setCommentForm] = useState(false)
    const user = +localStorage.getItem("astronomer")
    const history = useHistory()

    useEffect(() => {
        getSingleEvent(eventId).then(setEvent)
    },[])

    useEffect(() => {
        getUsersEventLikes(user).then(setUsersEventLikes)
    },[])

    useEffect(() => {getEventComments(eventId).then(setEventComments)},[])

    function syncUsersEventLikes() {
        getUsersEventLikes(user).then(setUsersEventLikes)
    }

    function syncEventComments() {
        getEventComments(eventId).then(setEventComments)
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

    function didTheyPostTheComment(comment) {
        if (comment.user.id === user) {
            return true
        }
        return false
    }


    return (
        <>
        <fieldset key={event.id}>
                    <div className="box">
                        <h4>Event: {event.name}</h4>
                        <h4>Description: </h4><p>{event.description}</p>
                        <p>Seen From: {event.seen_from}</p>
                        <div><img src={`http://localhost:8000${event?.event_pic}`} alt="hello" /></div>
                        <button className="button" onClick={() => {handleEventLike(event)}}>{
                            usersEventLikes.find((eventLike) => {
                                if (eventLike.event?.id === event.id) {
                                    return true
                                }
                                return false
                            })
                            ? "Unlike"
                            : "Like"
                        }</button>
                        <button className="button" onClick={() => {
                            setCommentForm(true)
                        }}>Comment</button>
                        {
                            !! JSON.parse(localStorage.getItem('isStaff')) === true
                            ? <div>
                                <button className="button" onClick={() => {deleteEvent(event.id).then(() => {history.push("/events")})}}>Delete</button>
                            </div>
                            : ""
                        }
                    </div>
        </fieldset>
            {
                    commentForm
                    ? <EventCommentForm commentForm={commentForm} setCommentForm={setCommentForm} event={event.id} syncEventComments={syncEventComments}/>
                    : ""
            }
        <fieldset>
            {
                eventComments.map((eventComment) => {
                    return <fieldset><div>
                    <p>Posted by: {eventComment.user?.user?.first_name} {eventComment.user?.user?.last_name}</p>
                    <p>{eventComment.comment}</p>
                </div>
                {
                    didTheyPostTheComment(eventComment)
                    ? <button onClick={() => {deleteEventComment(eventComment.id).then(syncEventComments)}}>Delete Comment</button>
                    : ""
                }
                </fieldset>
                })
            }
        </fieldset>
        </>
    )
}

export default EventDetail;