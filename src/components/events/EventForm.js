import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getEventTypes, uploadEvent } from "./eventManager";

function EventForm() {
    const history = useHistory()
    const eventName = useRef()
    const eventDescription = useRef()
    const seenFrom = useRef()
    const [eventTypes, setEventTypes] = useState([])
    const [selectedEventType, setSelectedEventType] = useState(0)
    const [eventPicture, setEventPicture] = useState("")
    const user = +localStorage.getItem("astronomer")


    useEffect(() => {
        getEventTypes().then(setEventTypes)
    },[])


    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
      const createUserImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            setEventPicture(base64ImageString)
        });
    }

    function handlePost(evt) {
        evt.preventDefault();

        const eventObj = {
            user: user,
            name: eventName.current.value,
            description: eventDescription.current.value,
            seen_from: seenFrom.current.value,
            event_type: +selectedEventType,
            is_approved: false,
            event_pic: eventPicture
        }

        uploadEvent(eventObj).then(() => {history.push("/events")})

    }



    return (
        <>
        <div className="form">
            <div>
                <label>Event Name: </label>
                <input type="text" ref={eventName} placeholder="Type here..." required autoFocus />
            </div>
            <div>
                <label>Description: </label>
                <input type="text" ref={eventDescription} placeholder="Type here..." required autoFocus />
            </div>
            <div>
                <label>Where can this event be seen from? </label>
                <input type="text" ref={seenFrom} placeholder="Type here..." required autoFocus />
            </div>
            <div>
                <label>What type of event is this? </label>
                <select className="categorydropdown" onChange={(evt) => {
                    const eventTypeId = evt.target.value
                    setSelectedEventType(eventTypeId)
                }}>
                       <option value="0">Select a Category</option>
                       {
                           eventTypes.map((eventType) => {
                               return <option key={`eventType--${eventType.id}`} value={eventType.id}>{eventType.event_type}</option>
                           })
                       }
                </select>
            </div>
            <div className="field">
              <input type="file" id="event_image" onChange={createUserImageString} />
            </div>
            <div>
                <button type="cancel" onClick={() => {history.push("/events")}}>Cancel</button>
                <button type="submit_post" onClick={handlePost}> Submit Event </button>
            </div>
        </div>
        
        </>
    )





}

export default EventForm;