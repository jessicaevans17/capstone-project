import React, { useEffect } from "react"
import { useTimer } from "react-timer-hook"

const Timer = ({ expiryTimestamp }) => {
  const { seconds, minutes, hours, days, start } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called")
  })

  return (
    <div>
      <div>
        <span>{days} Days</span>
        <span> {hours} Hours </span>
        <span>{minutes} Minutes</span>
        <span>{seconds} Seconds</span>
      </div>
    </div>
  )
}

export default Timer
