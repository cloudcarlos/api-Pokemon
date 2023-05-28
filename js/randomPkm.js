


function idPokemonRandom() {
    const min = 1; //primer pokemon
    const max = 1010; // ultimo pokemon
    const id = Math.floor(Math.random() * (max - min + 1)) + min; //genera un numero aleatorio entero entre min y max
    return id
}

function cardPokemonRandom(pokemon){ //base para renderizar el card en el id #random-pokemon
    const card =`
      <div class="card" style="width: 16rem;">
          <img src="${pokemon.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
              <p><a><h4 class="card-title">#${pokemon.numero}</h4><h5 class="card-title">${pokemon.nombre}</h5></a></p>
              <p class="card-text">${pokemon.descripcion}</p>
              
          </div>
      </div>
    `;
    return card;
}

function obtenerPokemon(id) { //  POKEMON RANDOM 
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`; //url de busqueda
    console.log('consumiendo api pokemon id...')
    return fetch(url) //consume los datos de la api con fetch
    .then(response => response.json()) //convertir los datos a json
    .then(data => {
        const pokemon = {
            numero : data.id,
            imagen : data.sprites.other["official-artwork"]["front_default"],
            nombre : data.name
        }
        //creamos las constantes con los valores del pokemon imagen, id para el numero del pokemon, nombre y 3 habilidades
        console.log("imagen numero y nombre capturados")
        return pokemon;
    })
    .catch(error => console.error(error));
}

function obtenerDescripcionPokemon(id){
    url = `https://pokeapi.co/api/v2/pokemon-species/${id}/`
    return fetch(url)
    .then(response => response.json())
    .then(data => {
        const flavorTextEntries = data.flavor_text_entries; // extraer todos los flavor_text_entries
        const flavorTextEspanol = flavorTextEntries.find(flavorText => flavorText.language.name === "es"); // Buscamos el objeto que tiene el "language" español
        return flavorTextEspanol.flavor_text; // Obtenemos el texto en español
    })
    .catch(error => console.error(error));
}

async function quienEsEsePokemon(){
    const id = idPokemonRandom();
    const pokemon = await obtenerPokemon(id);
    const descripcion = await obtenerDescripcionPokemon(id);
    pokemon.descripcion = descripcion;
    const pkmCard = cardPokemonRandom(pokemon);
    const pokemonContenedor = document.querySelector("#random-pokemon")
    pokemonContenedor.insertAdjacentHTML('beforeend', pkmCard)
    console.log("pkm agregado")//prueba
}