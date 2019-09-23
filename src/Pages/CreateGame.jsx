import React, { useState, useEffect } from "react"
import axios from "axios"

const CreateGame = () => {
  const [gameTitle, setGameTitle] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [locationName, setLocationName] = useState("")
  const [locationAddress, setLocationAddress] = useState("")
  const [locationState, setLocationState] = useState("")
  const [locationZip, setLocationZip] = useState("")
  const [minPlayers, setMinPlayers] = useState("")
  const [maxPlayers, setMaxPlayers] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const submitData = async event => {
    event.preventDefault()
    const resp = await axios.post("https://localhost:5001/api/Games", {
      gameTitle: gameTitle,
      zipCode: locationZip,
      address: locationAddress,
      minPlayers: minPlayers,
      maxPlayers: maxPlayers,
      creator: "Jessica Evans",
      dateOfPlay: dateTime
    })

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
    }, 3000)
    reset()
    console.log(resp.data)
  }

  const reset = () => {
    setGameTitle("")
    setDateTime("")
    setLocationName("")
    setLocationAddress("")
    setLocationState("")
    setLocationZip("")
    setMinPlayers("")
    setMaxPlayers("")
  }

  return (
    <main className="create-game-main">
      <h1>Create a New Game</h1>
      <div className="form-container">
        <form onSubmit={submitData}>
          <div className="game-form-item">
            <label>What game do you want to play?</label>
            <input
              type="text"
              onChange={e => {
                setGameTitle(e.target.value)
              }}
              value={gameTitle}
              placeholder="Title of Game"
            />
          </div>
          <div className="game-form-item">
            <label>When do you want to play?</label>
            <input
              type="datetime-local"
              onChange={e => {
                setDateTime(e.target.value)
              }}
              value={dateTime}
            />
          </div>
          <div className="game-form-item">
            <label>Where do you want to play?</label>
            <input
              type="text"
              onChange={e => {
                setLocationName(e.target.value)
              }}
              value={locationName}
              placeholder="Name of Place (i.e. My House, 3 Daughters)"
            />
            <input
              type="text"
              onChange={e => {
                setLocationAddress(e.target.value)
              }}
              value={locationAddress}
              placeholder="Address"
            />
            <input
              type="text"
              onChange={e => {
                setLocationState(e.target.value)
              }}
              value={locationState}
              placeholder="State"
            />
            <input
              type="number"
              onChange={e => {
                setLocationZip(e.target.value)
              }}
              value={locationZip}
              placeholder="Zip Code"
            />
          </div>
          <div className="game-form-item">
            <label>Minimum number of players needed? </label>
            <input
              type="number"
              onChange={e => {
                setMinPlayers(e.target.value)
              }}
              value={minPlayers}
              placeholder="Number"
            />
          </div>
          <div className="game-form-item">
            <label>Maximum number of players allowed? </label>
            <input
              type="number"
              onChange={e => {
                setMaxPlayers(e.target.value)
              }}
              value={maxPlayers}
              placeholder="Number"
            />
          </div>
          <button
            style={{ cursor: "pointer" }}
            id="create-game-button"
            type="submit"
          >
            Create Game
          </button>
          {isSubmitted ? (
            <>
              <p>Your game was created!</p>
            </>
          ) : (
            <></>
          )}
        </form>
      </div>
    </main>
  )
}

export default CreateGame
