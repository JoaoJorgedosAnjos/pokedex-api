import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getPokemonData, searchPokemon } from "../../services/pokedex-list"
import { Link } from "react-router-dom"
import { ThemeTogglerInfoButton } from "../theme-toggler-button/theme-toggler-button"
import styled, { css } from "styled-components"
import { useContext } from "react"
import { ThemeContext } from "../../contexts/theme-context"
import DexLogo from "../img/dexLogo.png"
import typeColors from "../../type-colors/type-colors"

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
            <Header style={{ background: theme.bcHeader }}>
            <DivHeader>
              <img src={DexLogo} />
              <H1>Loading...</H1>
            </DivHeader>
          </Header> 
            
            :
                <Section style = {{ backgroundColor: theme.infoBackground }
        } >
            <Header style={{ background: theme.bcHeader }}>
                <Link to="/">
                    <DivHeader>
                        <img src={DexLogo} />
                        <H1>Back to PokéList</H1>
                    </DivHeader>
                </Link>
                <ThemeTogglerInfoButton />
            </Header>
            <DivName >
                <H2 theme={theme}> {pokemon.name} </H2>
                <H2 theme={theme}>No. {pokeNumId}</H2>
            </DivName>
            <SectionCard>
                <Img src={pokemonImg} />
                <SectionInfo>
                    <Div1 theme={theme}>
                        <h3>Type</h3>
                        <TypesDiv >
                            {types}
                        </TypesDiv>
                    </Div1>
                    <DivTittleAbility theme={theme}>
                        <h3>Abilities</h3>
                        <Div2>
                            {abilities}
                        </Div2>
                    </DivTittleAbility>
                    <Div1 theme={theme}>
                        <H3 >Moves</H3>
                        <Ul >
                            {moves}
                        </Ul>
                    </Div1>
                </SectionInfo>
            </SectionCard>
        </Section >
    }
    </>
    )
}


const Img = styled.img`
@media (max-width: 630px) {
    width: 350px;;
  }
`
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
const Header = styled.header`
display:flex;
justify-content: space-between;
align-items: center;
width:100%;
}
`

const DivName = styled.div`
width:100%;
display:flex;
justify-content: center;
gap:25px; 
margin-top:25px;
`
const H2 = styled.h2`
font-size:25px;
font-weight: 700;
text-transform: capitalize;
color:${props => props.theme.color};
`

const DivHeader = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:10px;
color:#F2F5F5;
padding:10px;
`
const H1 = styled.h1`
font-size:25px;
font-weight: 700;
@media (max-width: 830px) {
    font-size:20px;
  }
`
const H3 = styled.h3`
border-radius: 10px;
`

const SectionCard = styled.section`
display:flex;
align-items:center;
justify-content: center;
width:500px;
margin-top:60px;
@media (max-width: 985px) {
    flex-direction:column;
    width:350px;
  }
`
const SectionInfo = styled.section`
display:flex;
align-items:center;
flex-direction: column;
width:500px;
gap:10px;
@media (max-width: 630px) {
    width: 350px;;
  }
`
const Div1 = styled.div`
width:100%;
gap:10px;
display:flex;
flex-direction:column;
border-radius: 10px;
background:${props => props.theme.infoCard};
color:${props => props.theme.color};
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
const TypesDiv = styled.div`
display:flex;
width:280px;
height:45px ;
gap:10px;
`
const DivTittleAbility = styled.div`
width:100%;
display:flex;
flex-direction:column;
gap:5px;
border-radius: 10px;
background:${props => props.theme.infoCard};
color:${props => props.theme.color};
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
const Div2 = styled.div`
display:flex;
border-radius: 10px;
`
const Ul = styled.ul`
display: block;
padding:5px;
height:135px ;
border: 1px solid #9932CC;
border-radius: 10px;
overflow-y:scroll;  
`

const Li = styled.li`
font-size:18px;
font-weight:500 ;
`
export { PokemonInfo }

