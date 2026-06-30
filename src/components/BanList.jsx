function BanList({ banList, removeFromBanList }) {
  return (
    <div className="ban-list">
      <h2>Ban List</h2>

      {banList.length === 0 ? (
        <p>No banned types yet.</p>
      ) : (
        banList.map((type) => (
          <button key={type} onClick={() => removeFromBanList(type)}>
            {type}
          </button>
        ))
      )}
    </div>
  );
}

export default BanList;