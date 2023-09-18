// Selecciona el contenedor de los Pokémon y el spinner
const pokemonContainer = document.querySelector(".pokemon-container");
const spinner = document.querySelector("#spinner");

// Obtiene y muestra un Pokémon aleatorio
function fetchRandomPokemon() {
// Genera un número aleatorio para el ID del Pokémon
    const randomPokemonId = Math.floor(Math.random() * 898) + 1;
    
// Realiza una solicitud a la API para obtener los datos del Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemonId}/`)
        .then(res => res.json())
        .then(data => {
            // Crea y muestra la tarjeta del Pokémon
            createPokemonCard(data);
            // Oculta el spinner después de cargar
            hideSpinner();
        })
        .catch(error => console.error("Error fetching random Pokemon:", error));
}

// Obtiene y muestra varios Pokémon aleatorios
function fetchRandomPokemons(number) {
    // Muestra el spinner
    showSpinner();
    // Obtiene y muestra varios Pokémon aleatorios
    for (let i = 0; i < number; i++) {
        fetchRandomPokemon();
    }
}

function fetchPokemonDescription(url) {
    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // La descripción suele estar en data.flavor_text_entries en el idioma deseado (por ejemplo, "en" para inglés).
        // Puedes filtrar la descripción según el idioma o cualquier otro criterio que desees.
        const descriptions = data.flavor_text_entries;
        const englishDescription = descriptions.find((entry) => entry.language.name === 'en');
  
        return englishDescription ? englishDescription.flavor_text : 'No description available.';
      })
      .catch((error) => {
        console.error('Error fetching Pokémon description:', error);
        return 'Error fetching description.';
      });
  }
// Crea la tarjeta de un Pokémon y la muestra en el contenedor
function createPokemonCard(pokemon) {
    // Crea elementos para la tarjeta del Pokémon
    const card = document.createElement("div");
    card.classList.add("pokemon-block");
    card.style.width = "280px"
    card.style.height = "240px"

    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = capitalizeFirstLetter(pokemon.name);

    const spriteInfo = document.createElement("img");
    spriteInfo.classList.add("sprite-info");
    spriteInfo.src = pokemon.sprites.front_default;
    spriteInfo.style.width = "120px";
    spriteInfo.style.height = "120px";  
    card.appendChild(spriteInfo);

    const numberInfo = document.createElement("div");
    numberInfo.classList.add("number-info");
    numberInfo.textContent = `#${pokemon.id.toString().padStart(3, '0')}`;
    card.appendChild(numberInfo);

    const nameInfo = document.createElement("div");
    nameInfo.classList.add("name-info");
    nameInfo.textContent = capitalizeFirstLetter(pokemon.name);
    card.appendChild(nameInfo);

    fetchPokemonDescription(pokemon.species.url)
  .then((description) => {
    // Agrega la descripción al objeto pokemon
    pokemon.description = description;

    const descriptionInfo = document.createElement("div");
    descriptionInfo.classList.add("description-info");
    descriptionInfo.textContent = description;
  })
  .catch((error) => {
    console.error('Error fetching Pokémon description:', error);
    const descriptionInfo = document.createElement("div");
    descriptionInfo.classList.add("description-info");
    descriptionInfo.textContent = 'No description available.';
  });


    const typeInfo = document.createElement("div");
    typeInfo.classList.add("type-info");
    typeInfo.textContent = capitalizeFirstLetter (pokemon.types.map(t => t.type.name).join(' · '));
    card.appendChild(typeInfo);

    const abilityInfo = document.createElement("div");
    abilityInfo.classList.add("ability-info");
    abilityInfo.textContent = capitalizeFirstLetter(pokemon.abilities[0].ability.name);
    card.appendChild(abilityInfo);

    const heightInfo = document.createElement("div");
    heightInfo.classList.add("height-info");
    heightInfo.textContent = `${(pokemon.height / 10).toFixed(1)} m`;
    card.appendChild(heightInfo);

    const weightInfo = document.createElement("div");
    weightInfo.classList.add("weight-info");
    weightInfo.textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
    card.appendChild(weightInfo);

    const ability = document.createElement("p");
    ability.textContent = `Habilidad: ${capitalizeFirstLetter(pokemon.abilities[0].ability.name)}`;

    const type = document.createElement("p");
    type.textContent = `Tipo: ${pokemon.types.map(t => t.type.name).join(', ')}`;

    card.addEventListener("click", () => {
        detailsContainer.classList.toggle("show-details");
        showPokemonAlert(pokemon);
    });

    pokemonContainer.appendChild(card);
}

// Capitaliza la primera letra de una cadena
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
// Muestra una alerta con detalles del Pokémon
    function showPokemonAlert(pokemon) {
        const firstTypeColor = getTypeColor(pokemon.types[0].type.name);
        const secondTypeColor = getTypeColor(pokemon.types[1]?.type.name);
        const statsHtml = pokemon.stats.map(stat => {
            return `<p>${capitalizeFirstLetter(stat.stat.name)}: ${stat.base_stat}</p>`;
        }).join('');
        const height = `<p><strong>Height:</strong> ${pokemon.height / 10} m</p>`;
        const weight = `<p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>`;
        const ability = `<p><strong>Ability:</strong> ${capitalizeFirstLetter(pokemon.abilities[0].ability.name)}</p>`;
        const type = `<p><span class="type" style="background-color: ${firstTypeColor};">${capitalizeFirstLetter(pokemon.types[0].type.name)}</span> <span class="type" style="background-color: ${secondTypeColor};">${capitalizeFirstLetter(pokemon.types[1]?.type.name || '')}</span></p>`
        const name = `<p><strong class="pokemon-name">${capitalizeFirstLetter(pokemon.name)}</strong></p>`
        const number = `<p><strong class="pokemon-number"># ${pokemon.id.toString().padStart(3, '0')}</strong></p>`;
        const description = `<p><strong>POKEDEX ENTRY</strong> ${pokemon.description}</p>`;
        const img = `<img src="${pokemon.sprites.front_default}" alt="Imagen del Pokémon" class="pokemon-image" style="width: 200px; height: 200px;">`;
        Swal.fire({

            html: `
            <div class="pokemon-alert">
                <div class="pokemon-header">
                    ${img}
                </div>
                <div class="pokemon-details">
                    ${number}
                    ${name}
                    ${type}
                    ${description}
                    ${height}
                    ${weight}
                    ${ability}
                </div>
                <div class="pokemon-stats">
                    <p><strong>Estadísticas</strong></p>
                        ${statsHtml}
                </div>
            </div>`,

            
        });
    }

// Obtiene el color correspondiente al tipo de Pokémon
function getTypeColor(type) {
    // Devuelve el color correspondiente al tipo
     const typeColors = {
        flying:"blue",
        ice:"blue",
        water:"blue",
        fire: "red",
        dragon: "red",
        fighting: "yellow",
        electric: "yellow",
        fairy: "yellow",
        grass: "green",
        poison: "green",
        bug: "green",
        psychic: "purple",
        rock: "brown",
        ground: "brown",
        steel: "gray",
        ghost: "gray",            
    };
    
    // Devuelve el color correspondiente al tipo
        return typeColors[type] || "black"; // Negro como color predeterminado
    }
    // Muestra el spinner
function showSpinner() {
    spinner.style.display = "block";
    }
    // Oculta el spinner
function hideSpinner() {
        spinner.style.display = "none";
    }
// Carga y muestra 6 Pokémones aleatorios al cargar la página
    fetchRandomPokemons(6);










