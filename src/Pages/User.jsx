import React, { useState, useEffect } from "react"
import axios from "axios"
import GameInfo from "../components/GameInfo"
import moment from "moment"

const User = props => {
  const [upcomingGames, setUpcomingGames] = useState([])
  const data = props.location.state.player
  console.log(data)
  const getUpcomingGames = async () => {
    const resp = await axios.get(
      `https://localhost:5001/api/Players/games/${data.userId}/upcoming`
    )

    console.log(resp.data)
    setUpcomingGames(resp.data)
  }

  useEffect(() => {
    getUpcomingGames()
  }, [])

  return (
    <>
      <header className="user-header">
        <h1>{data.name}</h1>
        <img src={data.profileURL} alt="Profile" />
        <h2>Upcoming games:</h2>
      </header>
      <main className="browse-games-main">
        {upcomingGames.map((g, i) => {
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
      </main>
    </>
  )
}

export default User
