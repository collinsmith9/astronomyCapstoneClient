

import React from "react"
import { Route } from "react-router-dom"
import EventFeed from "./events/EventFeed"
import EventForm from "./events/EventForm"
import MainFeed from "./feed/MainFeed"
import PostForm from "./feed/PostForm"
import UserProfile from "./users/UserProfile"



export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/">
            <MainFeed />
        </Route>
        <Route exact path="/events">
            <EventFeed />
        </Route>
        <Route exact path="/userprofile">
            <UserProfile />
        </Route>
        <Route exact path="/newpost">
            <PostForm />
        </Route>
        <Route exact path="/newevent">
            <EventForm />
        </Route>
        
        
        {/* <Route exact path="/">
            <Feed />
        </Route> */}
        {/* <Route exact path="/profile">
            <UserProfile />
        </Route> */}
        {/* <Route exact path="/helprequest">
            <HelpRequest />
        </Route>
        <Route exact path="/employees">
            <EmployeeList />
        </Route>
        <Route exact path="/helprequest/:hrId(\d+)">
            <EditHelpRequest />
        </Route>
        <Route exact path="/posts/:postId(\d+)">
            <EditPost />
        </Route> */}
        
        
        
        
        
        
        </>
    )
}