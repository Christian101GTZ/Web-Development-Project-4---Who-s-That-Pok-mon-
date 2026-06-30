# Web Development Project 4 - Who's That Pokémon?

Submitted by: **Christian Gomez**

This web app: **A Pokémon guessing game inspired by the classic "Who's That Pokémon?" segment from the Pokémon anime. Players are presented with a randomly selected Pokémon from the original Kanto Pokédex (Pokémon #1–150) and have three chances to correctly guess its name. If they get stuck, they can reveal the answer before moving on to the next Pokémon. Once a Pokémon has been identified, its type, height, weight, primary ability, and official Pokédex description are revealed. Players can also ban Pokémon types from future encounters, keep track of every Pokémon they have identified, and build their own Pokédex throughout the session.**

Time spent: **10 hours** spent in total.

---

## Required Features

The following **required** functionality is completed:

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data.**
  - [x] Pokémon type, height, weight, primary ability, and Pokédex description are consistently displayed after each successful guess or reveal.

- [x] **Only one item from an API response is viewable at a time, and at least one image is displayed per API call.**
  - [x] Only one Pokémon is displayed at a time.
  - [x] Displayed attributes always correspond to the displayed Pokémon.
  - [x] Every Pokémon includes its official artwork.

- [x] **API call response results appear random to the user.**
  - [x] Clicking **Start Game** or **Next Pokémon** randomly selects one of the original 150 Pokémon.
  - [x] Pokémon that have already been correctly identified are not selected again.

- [x] **Clicking on a displayed attribute adds it to a displayed ban list.**
  - [x] Pokémon types are clickable.
  - [x] Clicking a type immediately adds it to the ban list.
  - [x] Clicking a banned type immediately removes it from the ban list.

- [x] **Attributes on the ban list prevent future API results with that attribute from being displayed.**
  - [x] Pokémon whose types appear in the ban list are skipped during future API requests.
  - [x] Removing a type from the ban list immediately allows those Pokémon to appear again.

---

## Optional Features

The following **optional** features are implemented:

- [x] Users can view a history of Pokémon they have successfully identified during the current session.
  - [x] A dedicated **Identified Pokémon** section displays every Pokémon the player has correctly identified.
  - [x] The history updates each time a new Pokémon is successfully identified.

---

## Additional Features

The following additional features were implemented:

- [x] Three-attempt guessing system.
- [x] Reveal Pokémon button for players who cannot identify the Pokémon.
- [x] Live score counter tracking the number of Pokémon successfully identified.
- [x] Pokédex descriptions retrieved from the Pokémon Species API.
- [x] Component-based React architecture using `PokemonCard`, `BanList`, and `History`.
- [x] Prevents duplicate Pokémon from appearing after they have been identified.
- [x] Uses official Pokémon artwork provided by PokéAPI.
- [x] Limited to the original Kanto Pokédex (Pokémon #1–150).

---

## Video Walkthrough

Here's a walkthrough of the implemented user stories:

<img src="./src/assets/Project_4.gif" title="Desktop Walkthrough" width="900" alt="Desktop Walkthrough" />

### Mobile View

<img src="./src/assets/Project_4_phone_display.gif" title="Mobile Walkthrough" width="300" alt="Mobile Walkthrough" />

**GIFs created with ScreenToGif**

---

## Notes

One of the biggest challenges during development was designing the game mechanics instead of simply displaying API data. Managing multiple pieces of React state—including the current Pokémon, user guesses, remaining attempts, reveal state, ban list, score, and identified Pokémon history—required careful planning to keep the application organized.

Another challenge was combining data from two separate PokéAPI endpoints, since Pokédex descriptions are stored separately from the main Pokémon data. Refactoring the application into reusable React components (`PokemonCard`, `BanList`, and `History`) made the codebase easier to maintain and extend as additional gameplay features were added.

---

## License

```
Copyright 2026 Christian Gomez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```