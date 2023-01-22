let page = 1
const lastPokemon = 807
const pokemonsForPage = 15

const modalButton = `
    <button onclick="CloseModal()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36"><path fill="none" d="M0 0h24v24H0z"/><path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"/></svg>
    </button>
`

Renderizar()

function prevPage(){
    if(page > 1){
        page --
        Renderizar()
    }
}

function proxPage(){
    if(page < lastPokemon/pokemonsForPage){
        page++
        Renderizar()
    }
}

async function Renderizar(){
    let pokemons

    if(pokemonsForPage*page <= lastPokemon) pokemons = await getPokemons(pokemonsForPage * page - pokemonsForPage + 1, pokemonsForPage*page)
    else pokemons = await getPokemons(pokemonsForPage * page - pokemonsForPage + 1, lastPokemon)

    let html = TransformPokemonsInHtml(pokemons)

    document.getElementById('pokemons').innerHTML = html
    
    let pageTexts = document.getElementsByClassName('page')

    for(i in pageTexts){
        pageTexts[i].innerText = `Pagina ${page}/${Math.ceil(lastPokemon/pokemonsForPage)}`
    }

    console.log(pokemons)
}

async function OpenModal(pokemonId){
    const modal = document.getElementById('modal')
    const modalBody = document.getElementById('modal-body')
    let modalHtml = ''

    modal.className = ''

    fetchPokemon(pokemonId)
        .then(pokemon => {
            modalHtml += `
                ${modalButton}
                <h1>${pokemon.name}</h1>
                <div>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                <h3>Status:</h3>
                <ul>
                    <li class="hp">${pokemon.stats[0].base_stat}<br>HP</li>
                    <li class="atk">${pokemon.stats[1].base_stat}<br>Atk.</li>
                    <li class="def">${pokemon.stats[2].base_stat}<br>Def.</li>
                    <li class="sp-atk">${pokemon.stats[3].base_stat}<br>Sp. Atk.</li>
                    <li class="sp-def">${pokemon.stats[4].base_stat}<br>Sp. Def.</li>
                    <li class="speed">${pokemon.stats[5].base_stat}<br>Speed</li>
                </ul>
                <p>
                    <span class="info">Altura:</span> ${String(pokemon.height/10).replace('.', ',')} M <br>
                    <span class="info">Peso:</span> ${String(pokemon.weight/10).replace('.', ',')} Kg  <br>
                    <span class="info">Geração:</span> ${returnGeneration(pokemon.id)}
                </p>
            `

            modalBody.innerHTML = modalHtml
        })
    
}

function CloseModal(){
    const modal = document.getElementById('modal')
    modal.className = 'invisibled'
}

function TransformPokemonsInHtml(pokemons){
    let pokemonsHtml = ''

    for(i in pokemons){
        let pokemon = pokemons[i]
        pokemonsHtml += `
        <button class="poke-card" onclick="OpenModal(${pokemon.id})">
            <ul>
                <div>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                <li class="poke-name">${pokemon.id}. ${pokemon.name}</li>
                <li class="poke-types">
                    Tipos:
                    <ul>
                        <li class="${pokemon.types[0].type.name} poke-type">${pokemon.types[0].type.name}</li>
                        ${pokemon.types.length == 2 ? `<li class="${pokemon.types[1].type.name} poke-type">${pokemon.types[1].type.name}</li>` : ''}
                    </ul>
                </li>
            </ul>
        </button>`
    }

    return pokemonsHtml
}

function returnGeneration(pokemonId){
    let generations = [151, 251, 386, 493, 649, 721, 807]

    for(i in generations){
        if(pokemonId < generations[i]) return Number(i) +1
    }

    return -1
}

async function getPokemons(start, end){
    
    let check = EntryCheck(start, end)

    if(check.error){
        for(i in error.errorsAlert){
            console.log(error.errorsAlert[i])
        }
        return check
    }else{
        start = check.obj.start
        end = check.obj.end
    }
    


    let pokemons = []


    for(let i = start; i <= end; i++){
        await fetchPokemon(i)
            .then(pokemon => pokemons.push(pokemon))
            .catch(error => console.log(error))
    }


    return pokemons
}

async function fetchPokemon(pokemonId){
    let res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    let json = await res.json()
    
    return json
}

function EntryCheck(start, end){
    let check = {
        error: false,
        errorsAlert: [],
        obj: {
            start: 0,
            end: 0
        }
    }

    if(isNaN(start) || isNaN(end)) check.errorsAlert.push('É necessario inserir um número para essa função.')

    if(check.errorsAlert.length > 0){
        check.error = true
    }


    let _start = start
    let _end = end

    
    if(start <= 0) _start = 1

    if(end < start){
        _start = end
        _end = start
    }

    check.obj = {
        start: _start,
        end: _end
    }

    return check
}