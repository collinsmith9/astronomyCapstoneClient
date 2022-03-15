import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function PostForm() {
    const history = useHistory()
    const postCaption = useRef()



    return (
        <>
        <div className="form">
            <div>
                <label>Caption: </label>
                <input type="text" ref={postCaption} placeholder="Type caption here..." required autoFocus />
                
            </div>
        </div>
        
        </>
    )





}