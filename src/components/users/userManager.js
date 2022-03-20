export const getUser = (user) => {
    return fetch(`http://localhost:8000/users/${user}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem('token')}`
        }
    }).then(res => res.json())
}