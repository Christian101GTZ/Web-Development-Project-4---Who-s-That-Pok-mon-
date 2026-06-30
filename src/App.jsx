import { useState } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import BanList from './components/BanList';
import History from './components/History';

function App() {
  // Stores the Pokémon currently shown on screen
  const [currentPokemon, setCurrentPokemon] = useState(null);

  // Stores the user's current guess
  const [guess, setGuess] = useState('');

  // Stores feedback messages like "Correct!" or "Try again!"
  const [message, setMessage] = useState('');

  // Tracks whether the Pokémon's information should be revealed
  const [isRevealed, setIsRevealed] = useState(false);

  // User gets 3 chances to guess each Pokémon
  const [attempts, setAttempts] = useState(3);

  // Stores banned Pokémon types
  const [banList, setBanList] = useState([]);

  // Stores Pokémon the user has correctly identified
  const [history, setHistory] = useState([]);

  // Makes the first letter uppercase
  const capitalize = (text) =>
    text.charAt(0).toUpperCase() + text.slice(1);

  // Finds a random Pokémon that has not been identified or banned
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

  // Fetches Pokémon data and Pokédex description from PokéAPI
  const callAPI = async (id) => {
    const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemonData = await pokemonResponse.json();

    // Skip Pokémon that were already correctly identified
    const alreadyIdentified = history.some(
      (pokemon) => pokemon.name === pokemonData.name
    );

    if (alreadyIdentified) return false;

    // Skip Pokémon if one of its types is banned
    const pokemonTypes = pokemonData.types.map((type) => type.type.name);
    const isBanned = pokemonTypes.some((type) => banList.includes(type));

    if (isBanned) return false;

    // Second API call gets the Pokédex description
    const speciesResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${id}`
    );
    const speciesData = await speciesResponse.json();

    // Find the first English Pokédex entry
    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry) => entry.language.name === 'en'
    );

    // Clean weird spacing from API text
    const description = descriptionEntry.flavor_text
      .replace(/\f/g, ' ')
      .replace(/\n/g, ' ');

    // Save Pokémon data and description together
    setCurrentPokemon({
      ...pokemonData,
      description,
    });

    resetGame();
    return true;
  };

  // Resets the guessing state for a new Pokémon
  const resetGame = () => {
    setGuess('');
    setMessage('');
    setIsRevealed(false);
    setAttempts(3);
  };

  // Adds correctly guessed Pokémon to the history section
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

  // Checks whether the user's guess matches the Pokémon's name
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

    // If the guess is wrong, remove one attempt
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

  // Reveals the Pokémon without adding it to the identified history
  const revealPokemon = () => {
    if (!currentPokemon) return;

    setMessage(`The Pokémon was ${capitalize(currentPokemon.name)}.`);
    setIsRevealed(true);
  };

  // Adds a Pokémon type to the ban list
  const addToBanList = (typeName) => {
    if (!banList.includes(typeName)) {
      setBanList([...banList, typeName]);
    }
  };

  // Removes a Pokémon type from the ban list
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