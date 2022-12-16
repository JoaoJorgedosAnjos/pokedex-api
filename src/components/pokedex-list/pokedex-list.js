import { useEffect, useState, useContext } from "react"
import { createPokedexList, getPokemonData, filterPokemonByType } from "../../services/pokedex-list"
import styled from "styled-components"
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button"
import { ThemeContext } from "../../contexts/theme-context"
import { Header } from "../pages-components/header/header"
import { PokeList } from "../pages-components/poke-list/poke-list"
import { ButtonSetGen } from "../pages-components/button/button-set-gen/button"

const PokemonList = () => {

  const [pokedex, setPokedex] = useState([])
  const [offSet, setOffSet] = useState(0)
  const [nextUrl, setNextUrl] = useState('')
  const [prevUrl, setPrevUrl] = useState('')
  const [types, setTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    async function fetchData() {
      const data = await createPokedexList(offSet);
      setNextUrl(data.next);
      setPrevUrl(data.previous);

      await loadPokemon(data.results);
      setLoading(false)

    }
    fetchData()
  }, [offSet])

  const next = async () => {
    if (!nextUrl) return;
    let data = await getPokemonData(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  }

  const prev = async () => {
    if (!prevUrl) return;
    let data = await getPokemonData(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
  }

  useEffect(() => {
    const fetchData = async () => {
      const types = await filterPokemonByType()
      setTypes(types.results)
    }
    fetchData()
  }, [])

  const loadPokemon = async (data) => {
    const pokemonData = await Promise.all(data.map(async pokemon => {
      const pokemonArray = await getPokemonData(pokemon.url)
      return pokemonArray
    }))
    setPokedex(pokemonData);
  }

  return (
    <>
      {
        loading ?
          <Header tittle="Loading" types={types} pokedex={pokedex} setPokedex={setPokedex} /> : (
            <div style={{ background: theme.background }}>
              <Header tittle="Pokédex" types={types} pokedex={pokedex} setPokedex={setPokedex} />
              <SectionMain>
                <ThemeTogglerButton />
                <PokeList pokedex={pokedex} next={next} prev={prev} />
                <ButtonSetGen offSet={offSet} setOffSet={setOffSet} />
              </SectionMain>
            </div>
          )
      }
    </>
  )
}

const SectionMain = styled.section`
display:flex;
justify-content: center;
@media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
}
`

export { PokemonList }



