import { useState } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import BanList from './components/BanList';
import History from './components/History';

function App() {
  const [currentPokemon, setCurrentPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [isRevealed, setIsRevealed] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [banList, setBanList] = useState([]);
  const [history, setHistory] = useState([]);

  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  const discoverPokemon = async () => {
    if (history.length === 150) {
      setMessage("Congratulations! You've identified all 150 original Pokémon!");
      return;
    }

    let pokemonFound = false;

    while (!pokemonFound) {
      const randomId = Math.floor(Math.random() * 150) + 1;
      pokemonFound = await callAPI(randomId);
    }
  };

  const callAPI = async (id) => {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonResponse.json();

    const alreadyIdentified = history.some(
      (pokemon) => pokemon.name === pokemonData.name
    );

    if (alreadyIdentified) return false;

    const pokemonTypes = pokemonData.types.map((type) => type.type.name);
    const isBanned = pokemonTypes.some((type) => banList.includes(type));

    if (isBanned) return false;

    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const speciesData = await speciesResponse.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );

    const description = descriptionEntry.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ');

    setCurrentPokemon({
      ...pokemonData,
      description,
    });

    resetGame();
    return true;
  };

  const resetGame = () => {
    setGuess('');
    setMessage('');
    setIsRevealed(false);
    setAttempts(3);
  };

  const addToHistory = () => {
    setHistory((prevHistory) => {
      const alreadyIdentified = prevHistory.some(
        (pokemon) => pokemon.name === currentPokemon.name
      );

      if (alreadyIdentified) return prevHistory;

      return [
        ...prevHistory,
        {
          name: currentPokemon.name,
          image: currentPokemon.sprites.other['official-artwork'].front_default,
        },
      ];
    });
  };

  const checkGuess = () => {
    if (!currentPokemon || isRevealed) return;

    const userGuess = guess.trim().toLowerCase();
    const pokemonName = currentPokemon.name.toLowerCase();

    if (userGuess === pokemonName) {
      setMessage('Correct!');
      setIsRevealed(true);
      addToHistory();
      return;
    }

    if (attempts > 1) {
      setAttempts(attempts - 1);
      setMessage(`Try again! ${attempts - 1} guesses left.`);
    } else {
      setAttempts(0);
      setMessage(`Out of guesses! The Pokémon was ${capitalize(currentPokemon.name)}.`);
      setIsRevealed(true);
    }

    setGuess('');
  };

  const revealPokemon = () => {
    if (!currentPokemon) return;

    setMessage(`The Pokémon was ${capitalize(currentPokemon.name)}.`);
    setIsRevealed(true);
  };

  const addToBanList = (typeName) => {
    if (!banList.includes(typeName)) {
      setBanList([...banList, typeName]);
    }
  };

  const removeFromBanList = (typeName) => {
    setBanList(banList.filter((type) => type !== typeName));
  };

  return (
    <div className="app">
      <h1>Who's That Pokémon?</h1>
      <p>Kanto Edition: Original 150 Pokémon</p>

      <h2>Score: {history.length} Pokémon Identified</h2>

      <button onClick={discoverPokemon}>
        {currentPokemon ? 'Next Pokémon' : 'Start Game'}
      </button>

      <PokemonCard
        currentPokemon={currentPokemon}
        guess={guess}
        setGuess={setGuess}
        checkGuess={checkGuess}
        revealPokemon={revealPokemon}
        message={message}
        isRevealed={isRevealed}
        attempts={attempts}
        addToBanList={addToBanList}
      />

      <BanList
        banList={banList}
        removeFromBanList={removeFromBanList}
      />

      <History history={history} />
    </div>
  );
}

export default App;