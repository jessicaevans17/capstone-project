import React, { useState, useEffect } from "react"
import GameInfo from "../components/GameInfo"
import axios from "axios"
import { Link } from "react-router-dom"
import moment from "moment"

const BrowseGames = () => {
  const [games, setGames] = useState([])

  const fetchData = async () => {
    const resp = await axios.get("https://localhost:5001/api/Games")
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
        <h1>Browse Games</h1>
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
                address={game.address}
                date={moment(game.dateOfPlay).format("MMMM Do YYYY")}
                time={moment(game.dateOfPlay).format("LT")}
              />
            </Link>
          )
        })}
      </main>
    </>
  )
}
export default BrowseGames
