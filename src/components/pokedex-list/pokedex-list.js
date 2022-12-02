import { useEffect, useState } from "react"

async function createPokedexList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon")
    const pokeList = await response.json()
    console.log(pokeList)
    return pokeList
}

const PokeList = () => {
    const [pokemon, setPokemon] = useState( [])

    useEffect(() => {
        const fetchData = async () => {
            const pokemons = await createPokedexList()
            console.log(pokemons.results)

            setPokemon({
                pokemonName: pokemons.results
            }
            )
        }
        fetchData()
    },[])

    return (
        <div>
            <ul>
                {pokemon.pokemonName.map((poke, index) => {
                        return(
                            <li key={index}>
                                <p>{poke.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export { PokeList }