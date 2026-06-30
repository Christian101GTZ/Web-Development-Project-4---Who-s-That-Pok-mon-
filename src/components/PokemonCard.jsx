function PokemonCard({
  currentPokemon,
  guess,
  setGuess,
  checkGuess,
  revealPokemon,
  message,
  isRevealed,
  attempts,
  addToBanList,
}) {
  // Don't display anything until a Pokémon has been loaded
  if (!currentPokemon) return null;

  // Capitalize the first letter of a word
  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  // Convert PokéAPI values into meters and kilograms
  const heightInMeters = currentPokemon.height / 10;
  const weightInKg = currentPokemon.weight / 10;

  return (
    <div className="pokemon-card">
      {/* Display the Pokémon's official artwork */}
      <img
        src={currentPokemon.sprites.other['official-artwork'].front_default}
        alt="Mystery Pokémon"
      />

      {/* Show the guessing controls until the Pokémon is revealed */}
      {!isRevealed && (
        <>
          {/* Display the number of guesses remaining */}
          <p>Guesses left: {attempts}</p>

          {/* Input box where the user types their guess */}
          <input
            type="text"
            placeholder="Enter Pokémon name..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          {/* Check if the user's guess is correct */}
          <button onClick={checkGuess}>
            Submit Guess
          </button>

          {/* Reveal the answer if the user gives up */}
          <button onClick={revealPokemon}>
            Reveal Pokémon
          </button>
        </>
      )}

      {/* Display feedback messages */}
      {message && <h2>{message}</h2>}

      {/* Show Pokémon information after it has been revealed */}
      {isRevealed && (
        <div className="pokemon-info">
          <h2>{capitalize(currentPokemon.name)}</h2>

          {/* Clicking a type adds it to the ban list */}
          <p>
            <strong>Type:</strong>{' '}
            {currentPokemon.types.map((type) => (
              <button
                key={type.type.name}
                onClick={() => addToBanList(type.type.name)}
              >
                {capitalize(type.type.name)}
              </button>
            ))}
          </p>

          {/* Display Pokémon height */}
          <p>
            <strong>Height:</strong> {heightInMeters} m
          </p>

          {/* Display Pokémon weight */}
          <p>
            <strong>Weight:</strong> {weightInKg} kg
          </p>

          {/* Display the Pokémon's primary ability */}
          <p>
            <strong>Ability:</strong>{' '}
            {capitalize(currentPokemon.abilities[0].ability.name)}
          </p>

          {/* Display the Pokédex description */}
          <p>
            <strong>Description:</strong> {currentPokemon.description}
          </p>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;