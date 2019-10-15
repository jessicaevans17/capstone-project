import React from "react"
import UserIcon from "../images/userIcon.png"

const GameInfo = props => {
  return (
    <>
      <div className="game-info">
        <section className="game-info-top">
          <div>
            <h2>{props.title}</h2>
            <p>{`${props.date}, ${props.time}`}</p>
            <p>{`${props.city}, ${props.state} ${props.zipCode}`}</p>
          </div>
          <img
            className="game-img"
            src={props.gamePic}
            alt="Board Game Cover"
          />
        </section>
        <div className="attending">
          {props.players.map(player => {
            return (
              <div>
                <img className="profile-pic" src={player.profileURL} />
              </div>
            )
          })}
          <p>{props.playersGoing}</p>
        </div>

        {props.PlayersNeeded != 0 ? (
          <p>Players needed: {props.playersNeeded}</p>
        ) : (
          <>
            {" "}
            <p>Spots left: {props.maxAllowed}</p>
          </>
        )}
      </div>
    </>
  )
}
export default GameInfo
