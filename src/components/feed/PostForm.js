import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, uploadPost } from "./postManager";

function PostForm({postToEdit, setPostToEdit, handleEdit, postId, setNewImgStr, editCategories }) {
    const history = useHistory()
    const postCaption = useRef()
    const [selectedCategory, setSelectedCategory] = useState([])
    const [postPicture, setPostPicture] = useState("")
    const [categories, setCategories] = useState([])
    const user = +localStorage.getItem("astronomer")
    


    useEffect(() => {
        getCategories().then(setCategories)
    },[])


    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }
    
      const createUserImageString = (event) => {
        if (postId) {
            getBase64(event.target.files[0], (base64ImageString) => {
                setNewImgStr(base64ImageString)
            });

        } else {
            getBase64(event.target.files[0], (base64ImageString) => {
                setPostPicture(base64ImageString)
            });

        }
    }

    function handlePost(evt) {
        evt.preventDefault();

        const postObj = {
            user: user,
            caption: postCaption.current.value,
            categories: selectedCategory,
            post_pic: postPicture
        }

        uploadPost(postObj).then(() => {history.push("/")})

    }



    return (
        <>
        {
            postId
            ?<div className="form">
                <div>
                    <label>Caption: </label>
                    <input type="text"  defaultValue={postToEdit.caption} onChange={(evt) => {
                        const copy = {...postToEdit}
                        copy.caption = evt.target.value
                        setPostToEdit(copy)
                    }} on required autoFocus />
                    
                </div>
                <div>
                    <label>Select the category: </label>
                    <select className="categorydropdown" onChange={(evt) => {
                        editCategories.push(+evt.target.value)
                    }}>
                        <option value="0">Select a Category</option>
                        {
                            categories.map((category) => {
                                return <option key={`category--${category.id}`} value={category.id}>{category.category}</option>
                            })
                        }
                    </select>
                </div>
                <div className="field">
                <label>Replace Image: </label>
                <input type="file" id="post_image" onChange={createUserImageString} />
                </div>
                <div>
                    <button type="cancel" onClick={() => {history.push("/")}}>Cancel</button>
                    <button type="submit_post" onClick={handleEdit}> Submit Post </button>
                </div>
            </div>
            : <div className="form">
                <div>
                    <label>Caption: </label>
                    <input type="text" ref={postCaption} placeholder="Type caption here..." required autoFocus />
                    
                </div>
                <div>
                    <label>Select the category: </label>
                    <select className="categorydropdown" onChange={(evt) => {
                        selectedCategory.push(+evt.target.value)
                    }}>
                        <option value="0">Select a Category</option>
                        {
                            categories.map((category) => {
                                return <option key={`category--${category.id}`} value={category.id}>{category.category}</option>
                            })
                        }
                    </select>
                </div>
                <div className="field">
                <input type="file" id="post_image" onChange={createUserImageString} />
                </div>
                <div>
                    <button type="cancel" onClick={() => {history.push("/")}}>Cancel</button>
                    <button type="submit_post" onClick={handlePost}> Submit Post </button>
                </div>
            </div>
        }
        
        
        </>
    )





}

export default PostForm;