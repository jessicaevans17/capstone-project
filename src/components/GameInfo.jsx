import React from "react"
import { Link } from "react-router-dom"

const GameInfo = props => {
  return (
    <>
      <div className="game-info">
        <Link to="/view/game">
          <h2>{props.title}</h2>
          <p>
            <strong>Location:</strong> {props.address}
          </p>
          <p>
            <strong>Date and Time:</strong> {props.date} {props.time}
          </p>
          <p>
            <strong>Players still needed?</strong> Yes
          </p>
        </Link>
      </div>
    </>
  )
}

export default GameInfo
