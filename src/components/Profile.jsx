import React, { useState, useEffect } from "react"
import { useAuth0 } from "../react-auth0-wrapper"
import ProfilePic from "../images/profilepic.jpg"
import axios from "axios"
import GameInfo from "./GameInfo"
import moment from "moment"
import { Link } from "react-router-dom"
const Profile = () => {
  const { loading, user } = useAuth0()

  // if (loading || !user) {
  //   return <div>Loading...</div>
  // }
  const [upComingGames, setUpComingGames] = useState([])
  const findUpcomingGames = async () => {
    const resp = await axios.get(
      `https://localhost:5001/api/Players/games/${user.sub}/upcoming`
    )

    console.log(resp.data)
    setUpComingGames(resp.data)
  }

  useEffect(() => {
    findUpcomingGames()
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

          {upComingGames.length === 0 ? (
            <h3>You aren't signed up for any games yet!</h3>
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
