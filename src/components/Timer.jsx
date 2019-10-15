import React from "react"
import { useTimer } from "react-timer-hook"

const Timer = ({ expiryTimestamp, disableButtons }) => {
  const { seconds, minutes, hours, days } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("expired!")
      disableButtons(true)
    }
  })
  return (
    <div className="timer">
      <div>
        <h2>Time Left to Join:</h2>
        <span> {days} Days</span>
        <span> {hours} Hours </span>
        <span> {minutes} Minutes</span>
        <span> {seconds} Seconds</span>
      </div>
    </div>
  )
}

export default Timer
