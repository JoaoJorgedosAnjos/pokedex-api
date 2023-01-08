import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPokemonData, searchPokemon } from "../../services/pokedex-list"
import styled from "styled-components"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import typeColors from "../../type-colors/type-colors"
import { HeaderInfoPoke } from "../pages-components/header/header"
import { PokemonInfoCard } from "../pages-components/pokemon-card/pokemon-card"

const PokemonInfo = () => {

    const [pokemon, setPokemon] = useState({})
    const [pokemonImg, setPokemonImg] = useState()
    const [moves, setMoves] = useState([])
    const [types, setTypes] = useState([])
    const [abilities, setAbilities] = useState()
    const [pokeNumId, setPokeNumId] = useState()
    const { theme } = useContext(ThemeContext)
    const [loading, setLoading] = useState(true)

    const { id } = useParams()

    useEffect(() => {
        async function fetchData() {
            const pokemon = await searchPokemon(id)

            const pokemonTypes = pokemon.types
            const listTypes = pokemonTypes.map((type, index) => <DivType key={index} style={{ backgroundColor: typeColors[type.type.name] }}>{type.type.name}</DivType>)

            const pokemonId = pokemon.id.toString().padStart(3, "0")
            const pokemonMoves = pokemon.moves
            const listMoves = pokemonMoves.map((m, index) => <Li key={index}>{m.move.name}</Li>)

            const abilitiesPromises = pokemon.abilities.map((index) => getPokemonData(index.ability.url))
            const pokemonAbilities = await Promise.all(abilitiesPromises)
            const abilitiesList = pokemonAbilities.map((a, index) => {
                const abilitiesFilter = a.flavor_text_entries.filter((ability) => {
                    return ability.language.name === "en"
                })
                return (
                    <DivAbilities key={index}>
                        <h3>{a.name}</h3>
                        <p>{abilitiesFilter[0].flavor_text}</p>
                    </DivAbilities>
                )
            })

            setMoves(listMoves)
            setPokemon(pokemon)
            setLoading(false)
            setPokemonImg(pokemon.sprites.other["official-artwork"].front_default)
            setTypes(listTypes)
            setAbilities(abilitiesList)
            setPokeNumId(pokemonId)
        }
        fetchData()
    }, [])

    return (
        <>
            {
                loading ?
                    <HeaderInfoPoke tittle="Loading..." />
                    :
                    <Section style={{ backgroundColor: theme.infoBackground }
                    } >
                        <HeaderInfoPoke tittle="Back to PokéList" />
                        <PokemonInfoCard pokemon={pokemon} pokeNumId={pokeNumId} pokemonImg={pokemonImg} types={types} moves={moves} abilities={abilities} />
                    </Section >
            }
        </>
    )
}

const Section = styled.section`
display:flex;
align-items:center;
flex-direction: column;
background-size:cover;
min-width:100%;
min-height:100vh;
@media (max-width: 630px) {
    min-height:100%;
  }
`

const DivType = styled.div`
display:flex;
align-items:center;
justify-content:center;
border-radius:10px;
height:35px ;
width:95px;
font-weight:700 ;
color:white	;
font-size:21px;    
`

const DivAbilities = styled.div`
display:flex;
flex-direction:column;
width:250px;
gap:10px;
@media (max-width: 630px) {
    width: 150px;;
  }
`
const Li = styled.li`
font-size:18px;
font-weight:500 ;
`
export { PokemonInfo }

