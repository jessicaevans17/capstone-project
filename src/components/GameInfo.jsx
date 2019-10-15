import React from "react"

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
              <>
                <div>
                  <img
                    className="profile-pic"
                    src={player.profileURL}
                    alt={`Profile of ${player.name}`}
                  />
                </div>
                <p>{props.playersGoing}</p>
              </>
            )
          })}
        </div>
        {props.players.length > 0 ? (
          <div>
            {props.PlayersNeeded !== 0 ? (
              <p>Players needed: {props.playersNeeded}</p>
            ) : (
              <>
                {" "}
                <p>Spots left: {props.maxAllowed}</p>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
export default GameInfo
