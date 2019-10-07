import React, { useState } from "react"
import axios from "axios"

const Search = () => {
  const [results, setResults] = useState([])
  const [choice, setChoice] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const getInfo = async title => {
    const resp = await axios.get(
      `https://www.boardgameatlas.com/api/search?name=${title}&client_id=bxCT4QGQRS&limit=30`
    )
    console.log(resp.data.games)
    setResults(resp.data.games)
  }

  const handleChange = value => {
    if (value.length >= 1) {
      setIsOpen(true)
      getInfo(value)
    } else {
      setIsOpen(false)
    }
  }

  const handleClick = value => {
    setChoice(value)
  }

  return (
    <form>
      <input
        placeholder="Search for..."
        onChange={e => {
          handleChange(e.target.value)
        }}
      />
      {isOpen ? (
        <section className="dropdown-list">
          {results.map((game, i) => {
            return (
              <button
                key={i}
                type="button"
                onClick={e => handleClick(e.target.value)}
                value={game.name}
              >
                {game.name}
              </button>
            )
          })}
          <p>{choice}</p>
        </section>
      ) : (
        <></>
      )}
    </form>
  )
}

export default Search
