import React, { useEffect, useState } from "react"
import moment from "moment"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"

const Game = props => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const data = props.location.state.game
  console.log(data)
  const [players, setPlayers] = useState([])

  const AddPlayer = async () => {
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
            <figure>
              <img src={data.creatorProfilePic} alt="User's Profile" />
              <figcaption>{data.creator}</figcaption>
            </figure>
          </div>
          <p>
            <strong>Date: </strong>
            {moment(data.dateOfPlay).format("MMMM Do YYYY")}
          </p>
          <p>
            <strong>Time:</strong> {moment(data.dateOfPlay).format("LT")}
          </p>
          <p>
            <strong>Where:</strong> {data.locationName} <br></br>
            {data.address} <br></br>
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
                    src={player.profileURL}
                    alt={`Profile of ${player.name}`}
                  />
                )
              })}
            </section>
          </div>
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
