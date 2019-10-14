import React, { useState, useEffect } from "react"
import { useAuth0 } from "../react-auth0-wrapper"
import axios from "axios"
import GameInfo from "./GameInfo"
import moment from "moment"
import NavButtons from "./NavButtons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

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

  useEffect(() => {
    findUpcomingGames()
    findHostingGames()
  }, [])

  return (
    <>
      <main className="user-page-main">
        <section className="user-info">
          <img src={user.picture} alt="Profile" />
          <h1>{user.name}</h1>
        </section>
        <section className="upcoming-games">
          <h2>Upcoming games</h2>

          <div className="hand-point-down">{HandPointDown}</div>
          <h3>Hosting</h3>
          {gamesHosting.length === 0 ? (
            <>
              <h2>You aren't hosting any upcoming games! Let's fix that!</h2>
              <Link to="/new/game" className="sign-in-button">
                Start a Game
              </Link>
            </>
          ) : (
            <></>
          )}
          {gamesHosting.map((g, i) => {
            return (
              <GameInfo
                key={i}
                title={g.gameTitle}
                city={g.city}
                state={g.state}
                zipCode={g.zipCode}
                date={moment(g.dateOfPlay).format("MMMM Do YYYY")}
                time={moment(g.dateOfPlay).format("LT")}
              />
            )
          })}
          <h3>Attending</h3>
          {upComingGames.length === 0 ? (
            <section className="upcoming-games">
              <h2>Oh no! You aren't signed up for any games yet!</h2>
              <div className="hand-point-down">{HandPointDown}</div>
              <Link to="/browse/games" className="sign-in-button">
                Browse Games
              </Link>
            </section>
          ) : (
            <></>
          )}
          {upComingGames.map((g, i) => {
            return (
              <GameInfo
                key={g.id}
                title={g.game.gameTitle}
                city={g.game.city}
                state={g.game.state}
                zipCode={g.game.zipCode}
                date={moment(g.game.dateOfPlay).format("MMMM Do YYYY")}
                time={moment(g.game.dateOfPlay).format("LT")}
              />
            )
          })}
        </section>
      </main>
    </>
  )
}

export default Profile
