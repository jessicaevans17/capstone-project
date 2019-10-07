import React from "react"

const GameInfo = props => {
  return (
    <>
      <div className="game-info">
        <h2>{props.title}</h2>
        <p>
          <strong>Location:</strong> {props.address}
        </p>
        <p>
          <strong>Date and Time:</strong> {props.date}, {props.time}
        </p>
      </div>
    </>
  )
}
export default GameInfo
