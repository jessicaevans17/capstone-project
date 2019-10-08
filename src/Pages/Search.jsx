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
  }

  return (
    <form>
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
                  handleClick(e.target.value)
                  setIsOpen(false)
                }}
                value={game.name}
                title={game.name}
                description={game.description}
              >
                {game.name}
              </button>
            )
          })}
        </section>
      ) : (
        <></>
      )}
    </form>
  )
}

export default Search
