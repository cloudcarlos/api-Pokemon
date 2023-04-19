
function idItemRandom() {
    const min = 1; //primer item
    const max = 2099; // ultimo item
    const id = Math.floor(Math.random() * (max - min + 1)) + min; //genera un numero aleatorio entero entre min y max
    return id
}

function cardItemRandom(item){ //base para renderizar el card en el id #random-pokemon
    const card =`
      <div class="card" style="width: 16rem;">
          <img src="${item.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
              <p><a><h4 class="card-title">#${item.numero}</h4><h5 class="card-title">${item.nombre}</h5></a></p>
              <p class="card-text">${item.descripcion}</p>
              
          </div>
      </div>
    `;
    return card;
}

function obtenerItem(id) { //  POKEMON RANDOM 
    const url = `https://pokeapi.co/api/v2/item/${id}`; //url de busqueda
    console.log('consumiendo api item id...')
    return fetch(url) //consume los datos de la api con fetch
    .then(response => response.json()) //convertir los datos a json
    .then(data => {
        const item = {
            numero : data.id,
            imagen : data.sprites.default,
            nombre : data.name,
            atributos : data.attributes.name,
            descripcion : data["flavor_text_entries"].find(entry => entry.language.name === "es").text   //este paso es para tener la descripcion en español
        }
        //creamos las constantes con los valores del pokemon imagen, id para el numero del pokemon, nombre y 3 habilidades
        console.log("numero imagen nombre atributos descripcion capturados")
        return item;
    })
    .catch(error => console.error(error));
}

async function cualEsEseItem(){
    const id = idItemRandom();
    const item = await obtenerItem(id);
    const itemCard = cardItemRandom(item);
    const itemContenedor = document.querySelector("#random-items")
    itemContenedor.insertAdjacentHTML('beforeend', itemCard)
    console.log("item agregado")//prueba
}