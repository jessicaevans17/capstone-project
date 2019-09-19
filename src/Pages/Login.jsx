import React from "react"

const Login = () => {
  return (
    <main className="login-page">
      <section className="sign-in">
        <div className="form-container">
          <h1>Sign In</h1>
          <form className="sign-in-form" action="">
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
      <section className="create-account">
        <div className="form-container">
          <h1>New to GameStarter? Create an account and start playing! </h1>
          <form action="">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
            <input type="text" placeholder="Email Address" />
            <input type="text" placeholder="Favorite Game" />
            <input type="number" placeholder="Zip Code" />
            <input type="text" placeholder="Password" />
            <button type="submit">Submit</button>
          </form>
        </div>
      </section>
    </main>
  )
}

export default Login
