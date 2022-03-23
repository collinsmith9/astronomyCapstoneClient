import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import PostForm from './PostForm';
import { editPost, getSinglePost } from './postManager';


function EditPost() {
    const [postToEdit, setPostToEdit] = useState({})
    const [editedPost, setEditedPost] = useState({})
    const [editCategories, setEditCategories] = useState([])
    const [newImgStr, setNewImgStr] = useState("")
    const {postId} = useParams()
    const history = useHistory()

    useEffect(() => {
        getSinglePost(postId).then((res) => {
            setPostToEdit(res)
            setEditCategories(res.categories)
        })
    },[])

    // useEffect(() => {
    //     const catIds = postToEdit?.categories?.map((cat) => {
    //         return cat.id
    //     })
    //     setEditCategories(catIds)
    // },[])

    function handleEdit(evt) {
        evt.preventDefault()
        const arrayToSend = editCategories.map((cat) => {
            return cat.id
        })

        const updatedPost = {
            caption: postToEdit.caption,
            post_pic: newImgStr,
            categories: arrayToSend,
            user: postToEdit.user?.id,
        }

        fetch(`http://localhost:8000/posts/${postToEdit.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedPost)
        }).then(() => {history.push("/")})

        // editPost(postToEdit.id, updatedPost)
        //     .then(history.push("/"))
    }





    return (
        <>
        <h1>This will be the edit post view</h1>
        
        <PostForm postToEdit={postToEdit} setPostToEdit={setPostToEdit} handleEdit={handleEdit} postId={postId} setNewImgStr={setNewImgStr} editCategories={editCategories} />
        
        </>

        

    )
}

export default EditPost;