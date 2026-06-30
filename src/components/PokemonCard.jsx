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
  if (!currentPokemon) return null;

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const heightInMeters = currentPokemon.height / 10;
  const weightInKg = currentPokemon.weight / 10;

  return (
    <div className="pokemon-card">
      <img
        src={currentPokemon.sprites.other['official-artwork'].front_default}
        alt="Mystery Pokémon"
      />

      {!isRevealed && (
        <>
          <p>Guesses left: {attempts}</p>

          <input
            type="text"
            placeholder="Enter Pokémon name..."
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          <button onClick={checkGuess}>Submit Guess</button>
          <button onClick={revealPokemon}>Reveal Pokémon</button>
        </>
      )}

      {message && <h2>{message}</h2>}

      {isRevealed && (
        <div className="pokemon-info">
          <h2>{capitalize(currentPokemon.name)}</h2>

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

          <p><strong>Height:</strong> {heightInMeters} m</p>
          <p><strong>Weight:</strong> {weightInKg} kg</p>

          <p>
            <strong>Ability:</strong>{' '}
            {capitalize(currentPokemon.abilities[0].ability.name)}
          </p>

          <p><strong>Description:</strong> {currentPokemon.description}</p>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;