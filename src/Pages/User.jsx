import React, { useState, useEffect } from "react"
import axios from "axios"
import GameInfo from "../components/GameInfo"
import moment from "moment"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHandPointDown } from "@fortawesome/free-solid-svg-icons"

const HandPointDown = <FontAwesomeIcon icon={faHandPointDown} />

const User = props => {
  const [upcomingGames, setUpcomingGames] = useState([])
  const data = props.location.state.player
  console.log(data)
  const getUpcomingGames = async () => {
    const resp = await axios.get(
      `https://game-starter-app.herokuapp.com/api/Players/games/${data.userId}/upcoming`
    )

    console.log(resp.data)
    setUpcomingGames(resp.data)
  }

  useEffect(() => {
    getUpcomingGames()
  }, [])

  return (
    <>
      <main className="user-page-main margin-top-8">
        <section className="user-info">
          <img src={data.profileURL} alt="Profile" />
          <h1>{data.name}</h1>
        </section>
        <section className="upcoming-games">
          {data.firstName ? (
            <h2>{`${data.firstName}'s upcoming games:`}</h2>
          ) : (
            <h2>Upcoming games</h2>
          )}
          <div className="hand-point-down">{HandPointDown}</div>
          {upcomingGames.length === 0 ? (
            <section className="upcoming-games">
              <h3>{`Oh no! ${data.firstName} isn't signed up for any games yet!`}</h3>
            </section>
          ) : (
            <></>
          )}
          {upcomingGames.map((g, i) => {
            return (
              <GameInfo
                key={g.id}
                title={g.games.gameTitle}
                city={g.games.city}
                state={g.games.state}
                zipCode={g.games.zipCode}
                date={moment(g.games.dateOfPlay).format("MMMM Do YYYY")}
                time={moment(g.games.dateOfPlay).format("LT")}
                players={g.games.players}
                playersGoing={g.games.players.length}
                playersNeeded={g.games.minPlayers - g.games.players.length}
                maxAllowed={g.games.maxPlayers - g.games.players.length}
                gamePic={g.games.gameImageUrl}
              />
            )
          })}
        </section>
      </main>
    </>
  )
}

export default User
