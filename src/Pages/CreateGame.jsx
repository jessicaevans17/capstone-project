import React, { useState } from "react"
import axios from "axios"
import { useAuth0 } from "../react-auth0-wrapper"
import signUpPic from "../images/signuppic.jpg"
import { Redirect } from "react-router-dom"

const CreateGame = () => {
  const { user, getIdTokenClaims } = useAuth0()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [maxPlayers, setMaxPlayers] = useState("")
  const [minPlayers, setMinPlayers] = useState("")
  const [locationZip, setLocationZip] = useState("")
  const [locationState, setLocationState] = useState("")
  const [locationAddress, setLocationAddress] = useState("")
  const [locationName, setLocationName] = useState("")
  const [dateTime, setDateTime] = useState("")
  const [results, setResults] = useState([])
  const [choice, setChoice] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [gamePicture, setGamePicture] = useState("")
  const [minPlayTime, setMinPlayTime] = useState("")
  const [maxPlayTime, setMaxPlayTime] = useState("")
  const [rulesUrl, setRulesUrl] = useState("")
  const [privateResidence, setPrivateResidence] = useState(true)
  const [locationCity, setLocationCity] = useState("")
  const [game, setGame] = useState([])

  const getInfo = async title => {
    const resp = await axios.get(
      `https://www.boardgameatlas.com/api/search?name=${title}&client_id=bxCT4QGQRS&limit=30`
    )
    console.log(resp.data.games)
    setResults(resp.data.games)
  }

  const handleChange = title => {
    if (title.length) {
      setIsOpen(true)
      getInfo(title)
    } else {
      setIsOpen(false)
    }
  }

  const submitData = async event => {
    event.preventDefault()
    const userData = await getIdTokenClaims()
    const token = userData.__raw
    console.log({ token })
    const resp = await axios.post(
      "https://game-starter-app.herokuapp.com/api/Games",
      {
        gameTitle: choice,
        description: description,
        zipCode: locationZip,
        address: locationAddress,
        minPlayers: minPlayers,
        maxPlayers: maxPlayers,
        dateOfPlay: dateTime,
        locationName: locationName,
        city: locationCity,
        state: locationState,
        creator: user.name,
        creatorId: user.sub,
        creatorProfilePic: user.picture,
        minPlayTime: minPlayTime,
        maxPlayTime: maxPlayTime,
        gameImageUrl: gamePicture,
        rulesUrl: rulesUrl,
        privateResidence: privateResidence
      },
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    )
    setGame(resp.data)
    console.log(resp)
    setIsSubmitted(true)
    setTimeout(() => reset(), 2000)
  }

  const reset = () => {
    setIsSubmitted(false)
    setMaxPlayers("")
    setMinPlayers("")
    setLocationZip("")
    setLocationState("")
    setLocationAddress("")
    setLocationName("")
    setDateTime("")
    setResults([])
    setChoice("")
    setIsOpen(false)
    setDescription("")
    setGamePicture("")
    setMinPlayTime("")
    setMaxPlayTime("")
    setRulesUrl("")
    setPrivateResidence(true)
    setLocationCity("")
  }
  return (
    <main className="create-game-main">
      <h1>Start your game</h1>
      <div className="form-container">
        <form className="game-form" onSubmit={submitData}>
          <div className="game-form-item">
            <label>What game do you want to play?</label>
            <input
              type="text"
              placeholder="Search for..."
              onChange={e => {
                handleChange(e.target.value)
                setChoice(e.target.value)
              }}
              value={choice}
              required
            />
            {isOpen ? (
              <section className="dropdown-list">
                {results.map((game, i) => {
                  return (
                    <button
                      key={i}
                      className="dropdown-option"
                      type="button"
                      onClick={e => {
                        setChoice(game.name)
                        setDescription(game.description_preview)
                        setGamePicture(game.thumb_url)
                        setIsOpen(false)
                        setMinPlayTime(game.min_url)
                        setMaxPlayTime(game.max_url)
                        setRulesUrl(game.rules_url)
                        console.log(game.description_preview)
                      }}
                    >
                      {game.name}
                    </button>
                  )
                })}
              </section>
            ) : (
              <></>
            )}
          </div>
          <div className="game-form-item">
            <label>When do you want to play?</label>
            <input
              type="datetime-local"
              onChange={e => setDateTime(e.target.value)}
              value={dateTime}
              required
            />
          </div>
          <div className="game-form-item">
            <label>Where do you want to play?</label>
            <input
              type="text"
              onChange={e => setLocationName(e.target.value)}
              value={locationName}
              placeholder="Name of Place (i.e. My House, 3 Daughters)"
            />
            <p>Is this a private residence?</p>
            <div className="residence-type">
              <div>
                <input
                  type="radio"
                  onClick={() => {
                    setPrivateResidence(true)
                  }}
                  name="residence-type"
                  value="yes"
                />
                <label htmlFor="yes">Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  onClick={() => {
                    setPrivateResidence(false)
                  }}
                  name="residence-type"
                  value="no"
                />
                <label htmlFor="yes">No</label>
              </div>
            </div>
            <input
              type="text"
              onChange={e => setLocationAddress(e.target.value)}
              value={locationAddress}
              placeholder="Address"
              required
            />
            <input
              type="text"
              onChange={e => setLocationCity(e.target.value)}
              placeholder="City"
              required
            />
            <input
              type="text"
              onChange={e => setLocationState(e.target.value)}
              value={locationState}
              placeholder="State"
              required
            />
            <input
              type="number"
              onChange={e => setLocationZip(e.target.value)}
              required
              value={locationZip}
              placeholder="Zip Code"
            />
          </div>
          <div className="game-form-item">
            <label>
              Minimum number of players needed? (Including yourself)
            </label>
            <input
              type="number"
              onChange={e => setMinPlayers(e.target.value)}
              value={minPlayers}
              placeholder="Number"
              required
              min="1"
            />
          </div>
          <div className="game-form-item">
            <label>
              Maximum number of players allowed? (Including yourself){" "}
            </label>
            <input
              type="number"
              onChange={e => setMaxPlayers(e.target.value)}
              value={maxPlayers}
              placeholder="Number"
              min="1"
            />
          </div>
          <button
            style={{ cursor: "pointer" }}
            id="create-game-button"
            type="submit"
            className="submit-button"
          >
            Create Game
          </button>
          {isSubmitted ? (
            <>
              <p className="game-created">Your game was created!</p>
              <Redirect
                to={{
                  pathname: `/${game.id}`,
                  state: { game }
                }}
              />
            </>
          ) : (
            <></>
          )}
        </form>
        <img
          className="sign-up-pic"
          src={signUpPic}
          alt="Dragon playing piece on a board game."
        />
      </div>
    </main>
  )
}
export default CreateGame
