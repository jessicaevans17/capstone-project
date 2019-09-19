import React from "react"
import { Link } from "react-router-dom"
import Profile from "../images/profilepic.jpg"

const Game = () => {
  return (
    <>
      <main className="game-details">
        <h1>Game Information</h1>
        <div className="detailed-game-info">
          <p>
            <strong>Game:</strong> Settlers of Catan
          </p>
          <div className="players-attending join-info">
            <p>
              <strong>Created By:</strong>
            </p>
            <section>
              <Link to="/profile">
                <img src={Profile} alt="User's Profile Pic" />
              </Link>
            </section>
          </div>
          <p>
            <strong>Date:</strong> October 5, 2019
          </p>
          <p>
            <strong>Time:</strong> 12:00pm
          </p>
          <p>
            <strong>Where:</strong> 2927 Central Ave, St. Petersburg, FL 33713
          </p>
          <p>
            <strong> Number of Players Needed:</strong> 2
          </p>
          <div className="players-attending">
            <p>
              <strong>Players Attending:</strong> 1
            </p>
            <section>
              <Link to="/profile">
                <img src={Profile} alt="User's Profile Pic" />
              </Link>
            </section>
          </div>
          <p>
            <strong>Game Description:</strong> The women and men of your
            expedition build the first two settlements. Fortunately, the land is
            rich in natural resources. You build roads and new settlements that
            eventually become cities. Will you succeed in gaining supremacy on
            Catan? Barter trade dominates the scene. Some resources you have in
            abundance, other resources are scarce. Ore for wool, brick for
            lumber - you trade according to what is needed for your current
            building projects. Proceed strategically! If you found your
            settlements in the right places and skillfully trade your resources,
            then the odds will be in your favor. But your opponents are smart
            too.
          </p>
        </div>
      </main>
    </>
  )
}

export default Game
