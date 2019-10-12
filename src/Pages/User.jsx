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
      <h1>Upcoming Games</h1>
      <section>
        <h2>Games:</h2>
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
      </section>
    </>
  )
}

export default User
