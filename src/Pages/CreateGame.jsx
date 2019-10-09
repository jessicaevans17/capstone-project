import React, { useState, useEffect, useReducer } from "react"
import axios from "axios"
import { useAuth0 } from "../react-auth0-wrapper"

const formReducer = (state, action) => {
  switch (action.type) {
    case "field": {
      return {
        ...state,
        [action.fieldName]: action.payload
      }
    }
    case "submit": {
      return {
        ...state,
        isSubmitted: true
      }
    }

    case "reset": {
      return {
        gameTitle: "",
        dateTime: "",
        locationName: "",
        locationAddress: "",
        locationState: "",
        locationZip: "",
        locationCity: "",
        minPlayers: "",
        maxPlayers: "",
        isSubmitted: false,
        boardGameData: "",
        choice: ""
      }
    }

    default:
      return state
  }
}

const initialState = {
  gameTitle: "",
  dateTime: "",
  locationName: "",
  locationAddress: "",
  locationState: "",
  locationZip: "",
  locationCity: "",
  minPlayers: "",
  maxPlayers: "",
  isSubmitted: false,
  boardGameData: ""
}

const CreateGame = props => {
  const [state, dispatch] = useReducer(formReducer, initialState)
  const { user } = useAuth0()
  const {
    dateTime,
    locationName,
    locationAddress,
    locationState,
    locationZip,
    locationCity,
    minPlayers,
    maxPlayers,
    isSubmitted
  } = state

  const [results, setResults] = useState([])
  const [choice, setChoice] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [description, setDescription] = useState("")
  const [gamePicture, setGamePicture] = useState("")
  const [minPlayTime, setMinPlayTime] = useState("")
  const [maxPlayTime, setMaxPlayTime] = useState("")
  const [rulesUrl, setRulesUrl] = useState("")

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

  const handleClick = value => {
    console.log({ value })
    setChoice(value)
    console.log(description)
  }

  const submitData = async event => {
    event.preventDefault()
    dispatch({ type: "submit" })
    const resp = await axios.post("https://localhost:5001/api/Games", {
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
      creatorProfilePic: user.picture,
      minPlayTime: minPlayTime,
      maxPlayTime: maxPlayTime,
      gameImageUrl: gamePicture,
      rulesUrl: rulesUrl
    })
    console.log(resp)
    setTimeout(dispatch({ type: "reset" }), 3000)
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
              placeholder="Search for..."
              onChange={e => {
                handleChange(e.target.value)
                setChoice(e.target.value)
              }}
              value={choice}
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
                        handleClick(game.name)
                        setDescription(game.description)
                        setGamePicture(game.thumb_url)
                        setIsOpen(false)
                        setMinPlayTime(game.min_url)
                        setMaxPlayTime(game.max_url)
                        setRulesUrl(game.rules_url)
                        console.log(game.description)
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
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "dateTime",
                  payload: e.currentTarget.value
                })
              }
              value={dateTime}
            />
          </div>
          <div className="game-form-item">
            <label>Where do you want to play?</label>
            <input
              type="text"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "locationName",
                  payload: e.currentTarget.value
                })
              }
              value={locationName}
              placeholder="Name of Place (i.e. My House, 3 Daughters)"
            />
            <input
              type="text"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "locationAddress",
                  payload: e.currentTarget.value
                })
              }
              value={locationAddress}
              placeholder="Address"
            />
            <input
              type="text"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "locationCity",
                  payload: e.currentTarget.value
                })
              }
              value={locationCity}
              placeholder="City"
            />
            <input
              type="text"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "locationState",
                  payload: e.currentTarget.value
                })
              }
              value={locationState}
              placeholder="State"
            />
            <input
              type="number"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "locationZip",
                  payload: e.currentTarget.value
                })
              }
              value={locationZip}
              placeholder="Zip Code"
            />
          </div>
          <div className="game-form-item">
            <label>Minimum number of players needed? </label>
            <input
              type="number"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "minPlayers",
                  payload: e.currentTarget.value
                })
              }
              value={minPlayers}
              placeholder="Number"
            />
          </div>
          <div className="game-form-item">
            <label>Maximum number of players allowed? </label>
            <input
              type="number"
              onChange={e =>
                dispatch({
                  type: "field",
                  fieldName: "maxPlayers",
                  payload: e.currentTarget.value
                })
              }
              value={maxPlayers}
              placeholder="Number"
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
