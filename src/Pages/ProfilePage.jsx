import React from "react"
import Profile from "../images/profilepic.jpg"
import { Link } from "react-router-dom"
import GameInfo from "../components/GameInfo"
const ProfilePage = () => {
  return (
    <>
      <main className="profile-page-main">
        <h1>My Profile</h1>
        <div className="user-info">
          <img src={Profile} alt="User's Profile Picture" />
          <p>
            <strong>Username:</strong> BoardGameLady1
          </p>
          <p>
            <strong>Member Since:</strong> September 19, 2019
          </p>
          <p>
            <strong>Location:</strong> St.Petersburg, FL
          </p>
          <p>
            <strong>Favorite Game:</strong> Scrabble
          </p>
          <p>
            <strong>Games Attended:</strong> 10
          </p>
        </div>
        <div className="upcoming-games">
          <h1>My Upcoming Games</h1>
          <GameInfo />
        </div>
      </main>
    </>
  )
}

export default ProfilePage
