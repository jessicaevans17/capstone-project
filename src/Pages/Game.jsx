import React, { useEffect, useState } from "react"
import moment from "moment"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"
import altPic from "../images/AltGamePic.jpeg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faCalendarAlt,
  faMapMarkedAlt,
  faDice
} from "@fortawesome/free-solid-svg-icons"

const clock = <FontAwesomeIcon icon={faClock} />
const calendar = <FontAwesomeIcon icon={faCalendarAlt} />
const map = <FontAwesomeIcon icon={faMapMarkedAlt} />
const dice = <FontAwesomeIcon icon={faDice} />

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

  const DeletePlayer = async () => {
    const resp = await axios.delete(
      `https://localhost:5001/api/Players/${data.id}/${user.sub}`
    )
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
        <div className="detailed-game-info">
          <h1>{data.gameTitle}</h1>
          {data.gameImageUrl ? (
            <img
              className="boardgame-thumbnail"
              src={data.gameImageUrl}
              alt={`Thumbnail of ${data.gameTitle}`}
            />
          ) : (
            <></>
          )}

          <div className="players-attending join-info">
            <p>
              <strong>Hosted by:</strong>
            </p>
            <figure>
              <img
                className="profile-pic"
                src={data.creatorProfilePic}
                alt="User's Profile"
              />
              <figcaption>{data.creator}</figcaption>
            </figure>
          </div>
          <p>
            <strong>{calendar} </strong>
            {moment(data.dateOfPlay).format("MMMM Do YYYY")}
          </p>
          <p>
            <strong>{clock}</strong> {moment(data.dateOfPlay).format("LT")}
          </p>
          <p>
            <strong>{map}</strong> {data.locationName} <br></br>
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
                    className="profile-pic"
                    key={player.id}
                    src={player.profileURL}
                    alt={`Profile of ${player.name}`}
                  />
                )
              })}
            </section>
          </div>
          <div>
            {data.description ? (
              <p>
                <strong>Game Description: </strong> {data.description}
              </p>
            ) : (
              <p>
                <strong>Game Description: </strong> No description available...
              </p>
            )}

            {data.rulesUrl ? (
              <p>
                <strong>Game Rules: </strong>{" "}
                <a href={data.rulesUrl}>{data.rulesUrl}</a>
              </p>
            ) : (
              <p>
                <strong>Game Rules: </strong> No rules available...
              </p>
            )}
          </div>
        </div>
        {!isAuthenticated && (
          <button onClick={() => loginWithRedirect({})}>Join the game!</button>
        )}
        {isAuthenticated && (
          <>
            <button onClick={AddPlayer}>Join the game!</button>
            <button onClick={DeletePlayer}>Leave game</button>
          </>
        )}
      </main>
    </>
  )
}
export default Game
