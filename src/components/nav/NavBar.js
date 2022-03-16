import React from "react"
import { Link } from "react-router-dom"
// import "./NavBar.css"


function NavBar() {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Event Feed</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/userprofile">My Profile</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.clear()
                    }
                }>Logout</Link>
            </li>
        </ul>
    )
}

export default NavBar;