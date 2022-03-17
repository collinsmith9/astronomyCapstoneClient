export const getEventTypes = () => {
    return fetch(`http://localhost:8000/eventtypes`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const uploadEvent = (event) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(event)
    }
    return fetch(`http://localhost:8000/events`, fetchOptions)
    // .then(response => response.json())
}

export const getEvents = () => {
    return fetch('http://localhost:8000/events', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const approveEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}/approveevent`, {
        method: "PUT",
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
}