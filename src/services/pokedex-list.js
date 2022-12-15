export async function createPokedexList(offset) {
  let url = `https://pokeapi.co/api/v2/pokemon/?limit=10&offset=${offset}`
  const response = await fetch(url)
  const pokedexList = await response.json()
  return pokedexList
}

export async function getPokemonData(url) {
  const response = await fetch(url)
  return await response.json()
}

export const searchPokemon = async (pokemon) => {
  let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  const response = await fetch(url)
  return await response.json()
} 

export async function filterPokemonByType (){
  const response = await fetch("https://pokeapi.co/api/v2/type")
  const types = await response.json()
  return  types
}

export async function getPokemonType(url){
  const response = await fetch(url)
  return await response
}

