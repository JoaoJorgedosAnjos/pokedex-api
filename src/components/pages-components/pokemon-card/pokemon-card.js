import { ThemeContext } from "../../../contexts/theme-context"
import { useContext } from "react"
import styled from "styled-components"

export function PokemonInfoCard({ pokemon, pokeNumId, pokemonImg, types, abilities, moves }) {
  const { theme } = useContext(ThemeContext)

  return (
    <>
      <DivName >
        <H2 theme={theme}>{pokemon.name}</H2>
        <H2 theme={theme}>No. {pokeNumId}</H2>
      </DivName>
      <SectionCard>
        <Img src={pokemonImg} alt={pokemon.name} />
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
    </>
  )
}

const Img = styled.img`
@media (max-width: 630px) {
    width: 350px;;
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