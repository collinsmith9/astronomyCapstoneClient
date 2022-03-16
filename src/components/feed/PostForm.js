import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, uploadPost } from "./postManager";

function PostForm() {
    const history = useHistory()
    const postCaption = useRef()
    const [selectedCategory, setSelectedCategory] = useState(0)
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
        getBase64(event.target.files[0], (base64ImageString) => {
            setPostPicture(base64ImageString)
            console.log(base64ImageString)
        });
    }

    function handlePost(evt) {
        evt.preventDefault();

        const postObj = {
            user: user,
            caption: postCaption.current.value,
            categories: +selectedCategory,
            post_pic: postPicture
        }

        uploadPost(postObj).then(() => {history.push("/")})

    }



    return (
        <>
        <div className="form">
            <div>
                <label>Caption: </label>
                <input type="text" ref={postCaption} placeholder="Type caption here..." required autoFocus />
                
            </div>
            <div>
                <label>Select the employee you'd like</label>
                <select className="categorydropdown" onChange={(evt) => {
                    const copy = {...selectedCategory}
                    const emp = evt.target.value
                    setSelectedCategory(emp)
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
        
        </>
    )





}

export default PostForm;