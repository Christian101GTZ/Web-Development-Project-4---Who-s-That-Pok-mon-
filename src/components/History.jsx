function History({ history }) {
  return (
    <div className="history">
      <h2>Identified Pokémon</h2>

      {history.length === 0 ? (
        <p>No Pokémon identified yet.</p>
      ) : (
        history.map((pokemon, index) => {
          const displayName =
            pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

          return (
            <div key={index} className="history-card">
              <img src={pokemon.image} alt={displayName} />
              <p>{displayName}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default History;