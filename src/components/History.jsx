function History({ history }) {
  return (
    <div className="history">
      {/* Section title */}
      <h2>Identified Pokémon</h2>

      {/* Show a message if no Pokémon have been identified yet */}
      {history.length === 0 ? (
        <p>No Pokémon identified yet.</p>
      ) : (
        // Loop through every identified Pokémon
        history.map((pokemon, index) => {
          // Capitalize the Pokémon's name before displaying it
          const displayName =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

          return (
            <div key={index} className="history-card">
              {/* Display the Pokémon's image */}
              <img
                src={pokemon.image}
                alt={displayName}
              />

              {/* Display the Pokémon's name */}
              <p>{displayName}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default History;