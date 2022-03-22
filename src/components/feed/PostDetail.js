
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import { deleteComment, deletePost, deletePostLike, getPostComments, getSinglePost, getUsersPostLikes, likePost } from './postManager';


function PostDetail() {
    const [post, setPost] = useState({})
    const [postComments, setPostComments] = useState([])
    const {postId} = useParams()
    const user = +localStorage.getItem("astronomer")
    const [usersPostLikes, setUsersPostLikes] = useState([])
    const history = useHistory()
    const [commentForm, setCommentForm] = useState(false)

    useEffect(() => {
        getSinglePost(postId).then(setPost)
    },[])

    useEffect(() => {
        getPostComments(postId).then(setPostComments)
    },[])

    function syncPostComments() {
        getPostComments(postId).then(setPostComments)
    }

    useEffect(() => {
        getUsersPostLikes(user).then(setUsersPostLikes)
    },[])

    function syncUsersPostLikes() {
        getUsersPostLikes(user).then(setUsersPostLikes)
    }

    function postDeleteAuthorize(post) {
        if (post.user?.id === user) {
            return true
        }
        return false
    }

    
    function handleLikePost(post) {

        const didUserLike = usersPostLikes.find((postLike) => {
            if (postLike.post?.id === post.id) {
                return true
            }
            return false
        }) 

        function likeThePost() {
            const likeObj = {
                post: post.id,
                user: user
            }
            likePost(likeObj).then(() => {syncUsersPostLikes()})
        }

        function unlikeThePost() {
            deletePostLike(didUserLike.id).then(() => {syncUsersPostLikes()})
        }

        didUserLike
        ? unlikeThePost()
        : likeThePost()
    }

    function didTheyPostTheComment(comment) {
        if (comment.user.id === user) {
            return true
        }
        return false
    }


    return (
        <>
            <fieldset key={post.id}>
                    <div>
                        <p>Posted by: {post.user?.user?.first_name} {post.user?.user?.last_name}</p>
                        <h4>Caption: </h4><p>{post.caption}</p>
                        <div><img src={`http://localhost:8000${post?.post_pic}`} alt="hello" /></div>
                        <button onClick={() => {handleLikePost(post)}}>{
                            usersPostLikes.find((postLike) => {
                                if (postLike.post?.id === post.id) {
                                    return true
                                }
                                return false
                            })
                            ? "Unlike"
                            : "Like"
                        }</button>
                        <button onClick={() => {
                            setCommentForm(true)
                        }}>Comment</button>
                        {
                            postDeleteAuthorize(post)
                            ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {history.push("/")})}}>Delete</button>
                            </div>
                            : ""
                        }
                    </div>
                </fieldset>
                {
                    commentForm
                    ? <CommentForm commentForm={commentForm} setCommentForm={setCommentForm} post={post.id} syncPostComments={syncPostComments}/>
                    : ""
                }
                <fieldset>
                    {
                        postComments.map((postComment) => {
                            return <fieldset><div>
                                <p>Posted by: {postComment.user?.user?.first_name} {postComment.user?.user?.last_name}</p>
                                <p>{postComment.comment}</p>
                            </div>
                            {
                                didTheyPostTheComment(postComment)
                                ? <button onClick={() => {deleteComment(postComment.id).then(syncPostComments)}}>Delete Comment</button>
                                : ""
                            }
                            </fieldset>
                        }).reverse()
                    }
                </fieldset>
        </>
    )
}

export default PostDetail;