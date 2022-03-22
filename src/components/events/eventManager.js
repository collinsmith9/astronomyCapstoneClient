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

export const deleteEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const getUsersEventLikes = (user) => {
    return fetch(`http://localhost:8000/eventlikes?user=${user}`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}

export const likeEvent = (like) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(like)
    }
    return fetch(`http://localhost:8000/eventlikes`, fetchOptions)
    .then(response => response.json())
}

export const deleteEventLike = (id) => {
    return fetch(`http://localhost:8000/eventlikes/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const getSingleEvent = (id) => {
    return fetch(`http://localhost:8000/events/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const getEventComments = (id) => {
    return fetch(`http://localhost:8000/eventcomments?event=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const deleteEventComment = (id) => {
    return fetch(`http://localhost:8000/eventcomments/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const uploadEventComment = (comment) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(comment)
    }
    return fetch(`http://localhost:8000/eventcomments`, fetchOptions)
    // .then(response => response.json())
}