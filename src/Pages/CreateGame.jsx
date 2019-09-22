import React from "react"

const CreateGame = () => {
  return (
    <main className="create-game-main">
      <h1>Create a New Game</h1>
      <div className="form-container">
        <form>
          <div className="game-form-item">
            <label>What game do you want to play?</label>
            <input type="text" placeholder="Title of Game" />
          </div>
          <div className="game-form-item">
            <label>When do you want to play?</label>
            <input type="date" />
          </div>
          <div className="game-form-item">
            <label>What time?</label>
            <input type="time" name="game-time" id="game-time" />
          </div>
          <div className="game-form-item">
            <label>Where do you want to play?</label>
            <input
              type="text"
              placeholder="Name of Place (i.e. My House, 3 Daughters)"
            />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="State" />
            <input type="number" placeholder="Zip Code" />
          </div>
          <div className="game-form-item">
            <label>Minimum number of players needed? </label>
            <input type="number" placeholder="Number" />
          </div>
          <div className="game-form-item">
            <label>Maximum number of players allowed? </label>
            <input type="number" placeholder="Number" />
          </div>
          <button id="create-game-button" type="submit">
            Create Game
          </button>
        </form>
      </div>
    </main>
  )
}

export default CreateGame
