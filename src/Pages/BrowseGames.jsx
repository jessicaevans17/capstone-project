import React, { useState, useEffect } from "react"
import GameInfo from "../components/GameInfo"
import axios from "axios"

const BrowseGames = () => {
  const [games, setGames] = useState([])
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
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
            <GameInfo
              key={i}
              title={game.gameTitle}
              address={game.address}
              date={new Date(game.dateOfPlay).toLocaleString([], options)}
            />
          )
        })}
      </main>
    </>
  )
}

export default BrowseGames
