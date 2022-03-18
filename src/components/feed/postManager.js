export const getCategories = () => {
    return fetch(`http://localhost:8000/categories`, {
        headers: { "Authorization": `Token ${localStorage.getItem("token")}` }
    })
    .then(res => res.json())
}


export const uploadPost = (post) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(post)
    }
    return fetch(`http://localhost:8000/posts`, fetchOptions)
    // .then(response => response.json())
}

export const getPosts = () => {
    return fetch('http://localhost:8000/posts', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const getPostLikes = () => {
    return fetch('http://localhost:8000/postlikes', {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const getUsersPostLikes = (user) => {
    return fetch(`http://localhost:8000/postlikes?user=${user}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const deletePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const likePost = (like) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(like)
    }
    return fetch(`http://localhost:8000/postlikes`, fetchOptions)
    .then(response => response.json())
}

export const deletePostLike = (id) => {
    return fetch(`http://localhost:8000/postlikes/${id}`, {method: "DELETE", headers: {'Content-Type': 'application/json', "Authorization": `Token ${localStorage.getItem('token')}`}})
}

export const getSinglePost = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}

export const getPostComments = (id) => {
    return fetch(`http://localhost:8000/postcomments?post=${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}