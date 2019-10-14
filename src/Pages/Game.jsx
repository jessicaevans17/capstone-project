import React, { useEffect, useState } from "react"
import moment from "moment"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faClock,
  faCalendarAlt,
  faMapMarkedAlt,
  faCheck,
  faTimes,
  faUserAlt
} from "@fortawesome/free-solid-svg-icons"
import Timer from "../components/Timer"
import { Link } from "react-router-dom"

const clock = <FontAwesomeIcon icon={faClock} />
const calendar = <FontAwesomeIcon icon={faCalendarAlt} />
const map = <FontAwesomeIcon icon={faMapMarkedAlt} />
const check = <FontAwesomeIcon icon={faCheck} />
const times = <FontAwesomeIcon icon={faTimes} />
const userIcon = <FontAwesomeIcon icon={faUserAlt} />

const Game = props => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0()
  const data = props.location.state.game
  const gameTime = new Date(data.dateOfPlay)
  const deadline = moment(gameTime).subtract(1, "days")
  const [players, setPlayers] = useState([])
  const maxPlayers = data.maxPlayers
  const maxAllowed = maxPlayers - players.length
  const neededPlayers = data.minPlayers - players.length
  const [isExpired, setIsExpired] = useState(false)

  const AddPlayer = async () => {
    if (players.length === neededPlayers) {
      console.log("at capacity!")
    } else {
      try {
        const resp = await axios.post(
          `https://game-starter-app.herokuapp.com/api/Players/${data.id}/${user.sub}`,
          {
            userId: user.sub,
            name: user.name,
            email: user.email,
            profileUrl: user.picture,
            gameId: data.id,
            firstName: user.given_name,
            lastName: user.family_name
          }
        )
        ShowPlayers()
        console.log(resp)
      } catch {
        console.log("You're already going!")
      }
    }
  }

  const DeletePlayer = async () => {
    const resp = await axios.delete(
      `https://game-starter-app.herokuapp.com/api/Players/${data.id}/${user.sub}`
    )
    ShowPlayers()
    console.log(resp)
  }

  const ShowPlayers = async () => {
    const response = await axios.get(
      `https://game-starter-app.herokuapp.com/api/Players/${data.id}`
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
          <section className="game-and-host"></section>
        </section>
        <section className="join-info bottom-border">
          <div className="join-info-top">
            <div className="join-intro">
              {/* <p className="bold">Want to play?</p> */}
              <p>Spots left: {maxAllowed}</p>
              <p>Players needed: {neededPlayers}</p>
            </div>
            {!isAuthenticated && (
              <div className="attend-buttons">
                <button
                  className="join-button"
                  onClick={() => loginWithRedirect({})}
                >
                  {check}
                </button>
                <button
                  className="leave-button"
                  onClick={() => loginWithRedirect({})}
                >
                  {times}
                </button>
              </div>
            )}
            {isAuthenticated && (
              <div className="attend-buttons">
                <button className="join-button" onClick={AddPlayer}>
                  {check}
                </button>
                <button className="leave-button" onClick={DeletePlayer}>
                  {times}
                </button>
              </div>
            )}
          </div>
          <div className="timer-info bottom-border">
            <Timer expiryTimestamp={deadline} />
            <p>
              All or nothing. This game will only happen if it reaches the
              number of players needed by{" "}
              {moment(deadline).format("MMMM Do YYYY")}
            </p>
          </div>
          <div className="game-logistics">
            <div className="icon-details">
              <p>
                <strong>{calendar} </strong>
              </p>
              <p>{moment(data.dateOfPlay).format("MMMM Do YYYY")}</p>
            </div>
            <div className="icon-details">
              <p>
                <strong>{clock}</strong>{" "}
              </p>
              <p>{moment(data.dateOfPlay).format("LT")}</p>
            </div>

            {data.privateResidence ? (
              <div className="icon-details">
                <p>
                  <strong>{map}</strong>
                </p>
                <p>
                  {data.locationName} <br></br>
                  {`${data.city}, ${data.state} ${data.zipCode}`}
                  <br></br>
                  <br />
                  This game is happening at a private residence. Address will
                  only be revealed once you have joined the game.
                </p>
              </div>
            ) : (
              <div className="icon-details">
                <p>
                  <strong>{map}</strong>
                </p>
                <p>
                  {data.locationName} <br></br>
                  {data.address}
                  <br></br>
                  {`${data.city}, ${data.state} ${data.zipCode}`}
                </p>
              </div>
            )}
            <div className="icon-details">
              <p>
                <strong>{userIcon}</strong>
              </p>
              <p>Hosted by {data.creator}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="players-attending bottom-border">
            <p>
              <strong>Players Attending:</strong> {players.length}
            </p>
            <section>
              {players.map((player, i) => {
                return (
                  <Link
                    key={i}
                    to={{
                      pathname: `/user/profile/${player.id}`,
                      state: { player }
                    }}
                  >
                    <img
                      className="profile-pic"
                      key={player.id}
                      src={player.profileURL}
                      alt={`Profile of ${player.name}`}
                    />
                  </Link>
                )
              })}
            </section>
          </div>
          <div className="description-rules">
            {data.description ? (
              <p>
                <strong>Description: </strong> {data.description}
              </p>
            ) : (
              <p>
                <strong>Description: </strong> No description available...
              </p>
            )}

            {data.rulesUrl ? (
              <p>
                <strong>Rules: </strong>{" "}
                <a href={data.rulesUrl}>{data.rulesUrl}</a>
              </p>
            ) : (
              <p>
                <strong>Rules: </strong> No rules available...
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  )
}
export default Game
