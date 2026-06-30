function BanList({ banList, removeFromBanList }) {
  return (
    <div className="ban-list">
      {/* Section title */}
      <h2>Ban List</h2>

      {/* Show a message if there are no banned Pokémon types */}
      {banList.length === 0 ? (
        <p>No banned types yet.</p>
      ) : (
        // Display every banned Pokémon type
        banList.map((type) => (
          <button
            key={type}
            onClick={() => removeFromBanList(type)}
          >
            {type}
          </button>
        ))
      )}
    </div>
  );
}

export default BanList;