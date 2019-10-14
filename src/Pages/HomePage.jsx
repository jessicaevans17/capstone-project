import React from "react"
import NavButtons from "../components/NavButtons"
import Backsplash from "../images/backsplash.jpg"

const HomePage = () => {
  return (
    <>
      <main
        style={{
          backgroundImage: `url(${Backsplash})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover"
        }}
        className="main-homepage"
      >
        <section className="content">
          <h1 className="main-prompt">
            Want to play a board game, but have no one to play with?
          </h1>
          <NavButtons />
        </section>
      </main>
    </>
  )
}

export default HomePage
