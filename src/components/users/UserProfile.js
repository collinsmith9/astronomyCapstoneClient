import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { deletePost, deletePostLike, getPosts, getUsersPostLikes, getUsersPosts, likePost } from "../feed/postManager";
import { editBio, followUser, getUser, getUserFollows, unfollowUser } from "./userManager";
import "./user.css"

function UserProfile() {
    const [usersPosts, setUsersPosts] = useState([])
    const [theUser, setTheUser] = useState({})
    const [usersFollows, setUsersFollows] = useState([])
    const {userId} = useParams()
    const user = +localStorage.getItem("astronomer")
    const [usersPostLikes, setUsersPostLikes] = useState([])
    const [editBool, setEditBool] = useState(false)
    const newBio = useRef()

    console.log(theUser)
    useEffect(() => {
        getUsersPosts(userId).then(setUsersPosts)
    },[])

    useEffect(() => {
        getUser(userId).then(setTheUser)
    },[])

    useEffect(() => {
        getUserFollows(userId).then(setUsersFollows)
    },[])

    useEffect(() => {
        getUsersPostLikes(user).then(setUsersPostLikes)
    },[])

    function syncUserInfo() {
        getUser(userId).then(setTheUser)
    }

    function loggedInUserCheck() {
        if (user === theUser.id) {
            return true
        }
        return false
    }

    function syncUsersPostLikes() {
        getUsersPostLikes(user).then(setUsersPostLikes)
    }
    
    function syncPosts() {
        getUsersPosts(userId).then(setUsersPosts)
    }

    function syncUsersFollows() {
        getUserFollows(theUser.id).then(setUsersFollows)
    }

    function postDeleteAuthorize(post) {
        if (post.user.id === user) {
            return true
        }
        return false
    }

    
    function handleLikePost(post) {
        const didUserLike = usersPostLikes.find((postLike) => {
            if (postLike.post.id === post.id) {
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

    const followCheck = usersFollows.find((followObj) => {
        if (followObj.follower.id === user) {
            return true
        }
        return false
    })

    function handleFollow() {

        function followTheUser() {
            const followObj = {
                follower: user,
                person_followed: theUser?.id
            }
            followUser(followObj).then(() => {syncUsersFollows()})
        }

        function unfollowTheUser() {
            unfollowUser(followCheck.id).then(() => {syncUsersFollows()})
        }

        followCheck
        ? unfollowTheUser()
        : followTheUser()


    }

    function editBioForm() {
        return <div className="box">
            <input className="input" type="text" ref={newBio} placeholder="Type bio here..." required autoFocus />
            <button className="button is-small" onClick={() => {setEditBool(false)}}>Cancel</button><button className="button is-small" onClick={handleEdit}>Submit</button>
            
            </div>

        
    }

    function handleEdit(evt) {
        evt.preventDefault()

        const editedBio = {
            bio: newBio.current.value
        }

        editBio(editedBio, user).then(() => {
            syncUserInfo()
            setEditBool(false)
        
        })


    }



    return (
        <>
        <fieldset className="box">
        <h1>{theUser.user?.first_name} {theUser.user?.last_name}'s profile</h1>
        {
            loggedInUserCheck()
            ? <button className="button is-small" onClick={() => {setEditBool(true)}}>Edit Bio</button>
            : <button className="button is-small" onClick={() => {
                handleFollow()
            }}>{
                followCheck
                ? "Unfollow"
                : "Follow"
            }</button>
        }

        {
            !!editBool
            ? editBioForm()
            : ""
        }

        <p>{theUser.bio}</p>
        {/* <button>Future Follow Button</button> */}
        </fieldset>

        {
            usersPosts.map((post) => {
                return <div className="media">
                <fieldset key={post.id}>
                    <Link className="postDetailsLink" to={`/posts/${post.id}`}> 
                    <div className="media-content has-text-black">
                        <p>Posted by: {post.user?.user?.first_name} {post.user?.user?.last_name}</p>
                        <h4>Caption: </h4><p>{post.caption}</p>
                        <div><img className="postpic" src={`http://localhost:8000${post.post_pic}`} alt="hello" /></div>
                        {/* <button onClick={() => {handleLikePost(post)}}>{
                            didUserLike
                            ? "Unlike"
                            : "Like"
                        }</button> */}
                        {/* {
                            postDeleteAuthorize(post)
                            ? <div>
                                <button onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                            </div>
                            : ""
                        } */}
                    </div>
                </Link>
                    <button className="button is-small" onClick={() => {handleLikePost(post)}}>{
                        usersPostLikes.find((postLike) => {
                            if (postLike.post.id === post.id) {
                                return true
                            }
                            return false
                        })
                        ? "Unlike"
                        : "Like"
                    }</button>
                    {
                        postDeleteAuthorize(post)
                        ? <div>
                                <button className="button is-small" onClick={() => {deletePost(post.id).then(() => {syncPosts()})}}>Delete</button>
                            </div>
                        : ""
                    }
                </fieldset>
                </div>
            }).reverse()
        }

        </>
    )
}

export default UserProfile;