import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, uploadPost } from "./postManager";

function PostForm({postToEdit, setPostToEdit, handleEdit, postId, setNewImgStr, editCategories }) {
    const history = useHistory()
    const postCaption = useRef()
    const [postPicture, setPostPicture] = useState("")
    const [categories, setCategories] = useState([])
    const user = +localStorage.getItem("astronomer")
    const [selectedCategory, setSelectedCategory] = useState([])
    const [tryRerender, setTryRerender] = useState(false)
    


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

    function checkChecked(category) {
        const x = editCategories.find((cat) => {
            if (cat.id === +category.id) {
                return true
            }
            return false
        })

        // const haha = !tryRerender
        // setTryRerender(haha)

        return x
    }

    function handleCategoryCheckbox(category, index) {
        function makingPostFunc() {
            const isIn = selectedCategory.findIndex((cat) => {
                if (+category.id === cat) {
                    return true
                }
            })
            console.log(isIn)
    
            if (isIn !== -1) {
                selectedCategory.splice(isIn, 1)
            } else {
                selectedCategory.push(category.id)
            }
            console.log(selectedCategory)

        }

        function makingEditFunc() {
            const isIn = editCategories.findIndex((cat) => {
                if (+category.id === cat.id) {
                    return true
                }
            })
            console.log(isIn)
    
            if (isIn !== -1) {
                editCategories.splice(isIn, 1)
                setTryRerender(!tryRerender)
            } else {
                editCategories.push(category)
                setTryRerender(!tryRerender)
            }
            console.log(editCategories)

        }

        postId
        ? makingEditFunc()
        : makingPostFunc()

    }



    return (
        <>
        {
            postId
            ?<div className="box">
                <div>
                    <label className="label">Caption: </label>
                    <input type="text" className="input"  defaultValue={postToEdit.caption} onChange={(evt) => {
                        const copy = {...postToEdit}
                        copy.caption = evt.target.value
                        setPostToEdit(copy)
                    }} on required autoFocus />
                    
                </div>
                <div>
                    <label className="label">Select the category: </label>
                    {
                        categories.map((cat, index) => {
                            return <div><input type="checkbox" id={cat.id} value={cat.id} checked={checkChecked(cat) ? true : false} onChange={() => {handleCategoryCheckbox(cat, index)}} />
                            <label>{cat.category}</label>
                            
                            </div>

                        })
                    }
                </div>
                {/* <div className="file">
                    <label className="file-label">
                        <input className="file-input" type="file" id="post_image" onChange={createUserImageString} />
                        <span className="file-cta">
                            <span className="file-icon">
                                <i className="fas fa-upload"></i>
                            </span>
                            <span className="file-label">
                                Choose a file...
                            </span>
                        </span>
                    </label>
                </div> */}
                <div className="field">
                <label className="label">Replace Image: </label>
                <input type="file" id="post_image" onChange={createUserImageString} />
                </div>
                <div>
                    <button className="button is-small" type="cancel" onClick={() => {history.push("/")}}>Cancel</button>
                    <button className="button is-small" type="submit_post" onClick={handleEdit}> Submit Post </button>
                </div>
            </div>
            : <div className="box">
                <div className="control">
                    <label className="label">Caption: </label>
                    <input type="text" className="input" ref={postCaption} placeholder="Type caption here..." required autoFocus />
                    
                </div>
                <div>
                    <label className="label">Select the category: </label>
                    {
                        categories.map((cat, index) => {
                            return <div><input type="checkbox" className="checkbox" id={cat.id} value={cat.id} onChange={() => {handleCategoryCheckbox(cat, index)}} />
                            <label className="checkbox">{cat.category}</label>
                            
                            </div>

                        })
                    }
                </div>
                <div>
                <input type="file" id="post_image" onChange={createUserImageString} />
                </div>
                <div>
                    <button className="button is-small" type="cancel" onClick={() => {history.push("/")}}>Cancel</button>
                    <button className="button is-small" type="submit_post" onClick={handlePost}> Submit Post </button>
                </div>
            </div>
        }
        
        
        </>
    )





}

export default PostForm;