import React, { useEffect, useState } from "react"
import moment from "moment"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faCalendarAlt,
  faMapMarkedAlt,
  faCheck
} from "@fortawesome/free-solid-svg-icons"
import Countdown from "react-countdown-now"

const clock = <FontAwesomeIcon icon={faClock} />
const calendar = <FontAwesomeIcon icon={faCalendarAlt} />
const map = <FontAwesomeIcon icon={faMapMarkedAlt} />
const check = <FontAwesomeIcon icon={faCheck} />

const Game = props => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const data = props.location.state.game
  const [players, setPlayers] = useState([])
  console.log(new Date(data.dateOfPlay))

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
        <section className="main-game-info bottom-border">
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
        </section>
        <section className="join-info bottom-border">
          {!isAuthenticated && (
            <div>
              <p>Want to play?</p>
              <button
                className="join-button"
                onClick={() => loginWithRedirect({})}
              >
                {check}
              </button>
            </div>
          )}
          {isAuthenticated && (
            <div>
              <button className="join-button" onClick={AddPlayer}>
                Join the game!
              </button>
              <button className="leave-button" onClick={DeletePlayer}>
                Leave game
              </button>
            </div>
          )}
        </section>
        <section className="players-attending bottom-border">
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
        </section>
        <section>
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
        </section>
      </main>
    </>
  )
}
export default Game
