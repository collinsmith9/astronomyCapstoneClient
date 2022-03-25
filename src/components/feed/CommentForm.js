import React, { useEffect, useRef, useState } from 'react';
import { uploadPostComment } from './postManager';

function CommentForm ({commentForm, setCommentForm, post, syncPostComments}) {
    const comment = useRef()
    const user = +localStorage.getItem("astronomer")

    function handleComment(evt) {
        evt.preventDefault()

        const commentObj = {
            user: user,
            post: post,
            comment: comment.current.value
        }

        uploadPostComment(commentObj).then(syncPostComments).then(setCommentForm(false))

    }


    return (
        <>
        <div >
            <input className="input" type="text" ref={comment} placeholder="Comment" required autoFocus />
        
        <button className="button is-small" onClick={() => {setCommentForm(!commentForm)}}>Cancel</button><button className="button is-small" onClick={handleComment}>Submit</button>
        </div>
        </>
    )
}

export default CommentForm;