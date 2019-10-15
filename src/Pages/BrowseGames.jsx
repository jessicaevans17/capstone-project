import React, { useState, useEffect } from "react"
import GameInfo from "../components/GameInfo"
import axios from "axios"
import { Link } from "react-router-dom"
import moment from "moment"

const BrowseGames = () => {
  const [games, setGames] = useState([])

  const fetchData = async () => {
    const resp = await axios.get(
      "https://game-starter-app.herokuapp.com/api/Games"
    )
    console.log(resp.data)
    setGames(resp.data)
  }
  console.log(games)
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <main className="browse-games-main">
        <h1>Find your next game</h1>
        <div className="browse-games-container">
          {games.map((game, i) => {
            return (
              <Link
                key={i}
                to={{
                  pathname: `/${game.id}`,
                  state: { game }
                }}
              >
                <GameInfo
                  title={game.gameTitle}
                  city={game.city}
                  state={game.state}
                  zipCode={game.zipCode}
                  date={moment(game.dateOfPlay).format("MMMM Do YYYY")}
                  time={moment(game.dateOfPlay).format("LT")}
                  players={game.players}
                  playersGoing={game.players.length}
                  playersNeeded={game.minPlayers - game.players.length}
                  maxAllowed={game.maxPlayers - game.players.length}
                  gamePic={game.gameImageUrl}
                />
              </Link>
            )
          })}
        </div>
      </main>
    </>
  )
}
export default BrowseGames
