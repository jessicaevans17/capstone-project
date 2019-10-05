import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Profile from "../images/profilepic.jpg"
import moment from "moment"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"

const Game = props => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0()
  const data = props.location.state.game
  console.log(data)
  const [players, setPlayers] = useState([])

  const AddPlayer = async event => {
    const resp = await axios.post(
      `https://localhost:5001/api/Players/${data.id}`,
      {
        userId: user.sub,
        name: user.name,
        email: user.email,
        profileUrl: user.picture,
        gameId: data.id
      }
    )

    console.log(resp.data)
  }

  const ShowPlayers = async () => {
    const response = await axios.get(
      `https://localhost:5001/api/Players/${data.id}`
    )
    console.log(response.data)
    setPlayers(response.data)
  }

  useEffect(() => {
    ShowPlayers()
  }, [])

  return (
    <>
      <main className="game-details">
        <h1>Game Information</h1>
        <div className="detailed-game-info">
          <p>
            <strong>Game:</strong> {data.gameTitle}
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
            <strong>Date: </strong>
            {moment(data.dateOfPlay).format("MMMM Do YYYY")}
          </p>
          <p>
            <strong>Time:</strong> {moment(data.dateOfPlay).format("LT")}
          </p>
          <p>
            <strong>Where:</strong> {data.locationName}
            {data.address}
            {data.city}
            {data.state}
            {data.zipCode}
          </p>
          <p>
            <strong> Number of Players Needed:</strong> {data.minPlayers}
          </p>
          <div className="players-attending">
            <p>
              <strong>Players Attending:</strong> {players.length}
            </p>
            <section>
              {players.map(player => {
                return (
                  <img
                    key={player.id}
                    src={player.profileUrl}
                    alt={`Profile picture of ${player.name}`}
                  />
                )
              })}
            </section>
          </div>
          {/* <p>
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
          </p> */}
        </div>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Join the game!</button>
        )}
        {isAuthenticated && (
          <>
            <button onClick={AddPlayer}>Join the game!</button>
          </>
        )}
      </main>
    </>
  )
}
export default Game
