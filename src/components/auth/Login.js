import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"


function Login() {
    const username = useRef()
    const password = useRef()
    const invalidDialog = useRef()
    const history = useHistory()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch("http://127.0.0.1:8000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                username: username.current.value,
                password: password.current.value
            })
        })
            .then(res => res.json())
            .then(res => {
                if ("valid" in res && res.valid && "token" in res) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("astronomer", res.userid)
                    localStorage.setItem("isStaff", res.isStaff)
                    history.push("/")
                }
                else {
                    invalidDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--login">
            <dialog className="dialog dialog--auth" ref={invalidDialog}>
                <div>Username or password was not valid.</div>
                <button className="button--close" onClick={e => invalidDialog.current.close()}>Close</button>
            </dialog>
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Astronomy Site</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label className="label" htmlFor="inputUsername"> Username address </label>
                        <input className="input" ref={username} type="username" id="username" placeholder="Username address" required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label className="label" htmlFor="inputPassword"> Password </label>
                        <input className="input" ref={password} type="password" id="password" placeholder="Password" required />
                    </fieldset>
                    <fieldset style={{
                        textAlign: "center"
                    }}>
                        <button className="button is-small" type="submit" onClick={handleLogin}>Sign In</button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}

export default Login