import React, { useEffect, useRef, useState } from 'react';
import { uploadEventComment } from './eventManager';

function EventCommentForm ({commentForm, setCommentForm, event, syncEventComments}) {
    const comment = useRef()
    const user = +localStorage.getItem("astronomer")

    function handleComment(evt) {
        evt.preventDefault()

        const commentObj = {
            user: user,
            event: event,
            comment: comment.current.value
        }

        uploadEventComment(commentObj).then(syncEventComments).then(setCommentForm(false))

    }


    return (
        <>
        <div>
            <input type="text" ref={comment} placeholder="Comment" required autoFocus />
        
        <button onClick={() => {setCommentForm(!commentForm)}}>Cancel</button><button onClick={handleComment}>Submit</button>
        </div>
        </>
    )
}

export default EventCommentForm;