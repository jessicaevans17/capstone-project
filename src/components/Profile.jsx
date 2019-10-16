import React, { useState, useEffect } from "react"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"
import GameInfo from "./GameInfo"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

const API_URL = "https://localhost:5001"

const HandPointDown = <FontAwesomeIcon icon={faHandPointDown} />

const Profile = () => {
  const { user } = useAuth0()
  const [upComingGames, setUpComingGames] = useState([])
  const [gamesHosting, setGamesHosting] = useState([])

  const findUpcomingGames = async () => {
    const resp = await axios.get(
      `https://game-starter-app.herokuapp.com/api/Players/games/${user.sub}/upcoming`
    )

    console.log(resp.data)
    setUpComingGames(resp.data)
  }

  const findHostingGames = async () => {
    const resp = await axios.get(
      `https://game-starter-app.herokuapp.com/api/Games/hosting/${user.sub}`
    )
    console.log(resp.data)
    setGamesHosting(resp.data)
  }
  const DeleteGame = async game => {
    const resp = await axios.delete(
      `https://game-starter-app.herokuapp.com/api/Games/delete/${game}/${user.sub}`
    )
    console.log(resp)
    findHostingGames()
    findUpcomingGames()
  }

  useEffect(() => {
    findUpcomingGames()
    findHostingGames()
  }, [])

  return (
    <>
      <main className="user-page-main margin-top-8">
        <section className="user-info">
          <img src={user.picture} alt="Profile" />
          <h1>{user.name}</h1>
        </section>
        <section>
          <section className="upcoming-games">
            <h3>Hosting</h3>
            {gamesHosting.length === 0 ? (
              <>
                <h4>You aren't hosting any upcoming games! Let's fix that!</h4>
                <div className="hand-point-down">{HandPointDown}</div>
                <Link to="/new/game" className="sign-in-button-white">
                  Start a Game
                </Link>
              </>
            ) : (
              <></>
            )}
            {gamesHosting.map((g, i) => {
              return (
                <>
                  <GameInfo
                    key={i}
                    title={g.gameTitle}
                    city={g.city}
                    state={g.state}
                    zipCode={g.zipCode}
                    date={moment(g.dateOfPlay).format("MMMM Do YYYY")}
                    time={moment(g.dateOfPlay).format("LT")}
                    players={g.players}
                    playersGoing={g.players.length}
                    playersNeeded={g.minPlayers - g.players.length}
                    maxAllowed={g.maxPlayers - g.players.length}
                    gamePic={g.gameImageUrl}
                  />
                  <button
                    className="cancel-button"
                    onClick={e => {
                      DeleteGame(g.id)
                    }}
                  >
                    Cancel Game
                  </button>
                </>
              )
            })}
          </section>
          {upComingGames.length === 0 ? (
            <section className="upcoming-games">
              <h3>Attending</h3>
              <h4>Oh no! You aren't signed up for any games yet!</h4>
              <div className="hand-point-down">{HandPointDown}</div>
              <Link to="/browse/games" className="sign-in-button-white">
                Browse Games
              </Link>
            </section>
          ) : (
            <>
              <section className="upcoming-games">
                <h3>Attending</h3>
                {upComingGames.map((g, i) => {
                  return (
                    <GameInfo
                      key={g.games.id}
                      title={g.games.gameTitle}
                      city={g.games.city}
                      state={g.games.state}
                      zipCode={g.games.zipCode}
                      date={moment(g.games.dateOfPlay).format("MMMM Do YYYY")}
                      time={moment(g.games.dateOfPlay).format("LT")}
                      players={g.games.players}
                      playersGoing={g.games.players.length}
                      playersNeeded={
                        g.games.minPlayers - g.games.players.length
                      }
                      maxAllowed={g.games.maxPlayers - g.games.players.length}
                      gamePic={g.games.gameImageUrl}
                    />
                  )
                })}
              </section>
            </>
          )}
        </section>
      </main>
    </>
  )
}

export default Profile
