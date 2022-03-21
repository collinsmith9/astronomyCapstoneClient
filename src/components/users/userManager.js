export const getUser = (user) => {
    return fetch(`http://localhost:8000/users/${user}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const getUserFollows = (id) => {
    return fetch(`http://localhost:8000/follows?personfollowed=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const followUser = (follow) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(follow)
    }
    return fetch(`http://localhost:8000/follows`, fetchOptions)
    .then(response => response.json())
}

export const unfollowUser = (followId) => {
    return fetch(`http://localhost:8000/follows/${followId}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const editBio = (bio, user) => {
    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(bio)
    }
    return fetch(`http://localhost:8000/users/${user}`, fetchOptions)
    // .then(response => response.json())
}