import { useEffect, useState, useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCodeCommit } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom"
import { createPokedexList, getPokemonData, filterPokemonByType } from "../../services/pokedex-list"
import { FilterType } from "../filter-list/filter-list"
import styled, { css } from "styled-components"
import { ThemeTogglerButton } from "../theme-toggler-button/theme-toggler-button"
import { ThemeContext } from "../../contexts/theme-context"
import Logo from "../img/logo.png"
import DexLogo from "../img/dexLogo.png"
import { Gen1Button, Gen2Button, Gen3Button, Gen4Button, Gen5Button, Gen6Button, Gen7Button, Gen8Button } from "../button-list-control/set-gen-list"

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
          <Header style={{ background: theme.bcHeader }}>
            <DivHeader>
              <img src={DexLogo} />
              <H1>Loading...</H1>
            </DivHeader>
          </Header> : (

            <div>
              <SectionPage style={{ background: theme.background }}>
                <section>
                  <Header style={{ background: theme.bcHeader }}>
                    <DivHeader>
                      <img src={DexLogo} />
                      <H1>Pokédex</H1>

                    </DivHeader>
                    <DivHeader fil>
                      <img src={Logo} />
                      <FilterType types={types} pokedex={pokedex} setPokedex={setPokedex} />
                    </DivHeader>
                  </Header>
                </section>
                <DivMain>
                  <ThemeTogglerButton />
                  <div>
                    <Ul style={{ background: theme.ulBackground }}>
                      {
                        pokedex.map((poke, index) => {
                          return (
                            <section key={index}>
                              <Link to={`/pokemon/${poke.id}`} >
                                <Li theme={theme}>
                                  <Div >
                                    <ImgPoke src={poke.sprites.front_default} alt={poke.name} />
                                    <p >No. {poke.id.toString().padStart(3, "0")}</p>
                                  </Div>
                                  <Div second>
                                    <p>{poke.name}</p>
                                    <div>
                                      <PFont> <FontAwesomeIcon icon={faCircle} /></PFont>
                                      <PFont white><FontAwesomeIcon icon={faCodeCommit} style={{ position: "absolute", right: -0.6, top: 4.5, color: theme.pokeballColor }} /></PFont>
                                    </div>
                                  </Div>
                                </Li>
                              </Link>
                            </section>
                          )
                        })
                      }
                    </Ul>
                    <DivButtonBotton>
                      <Button theme={theme} onClick={prev}>＜</Button>
                      <Button theme={theme} onClick={next}>＞</Button>
                    </DivButtonBotton>

                  </div>
                  <DivButton>
                    <Gen1Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen2Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen3Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen4Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen5Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen6Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen7Button offSet={offSet} setOffSet={setOffSet} />
                    <Gen8Button offSet={offSet} setOffSet={setOffSet} />
                  </DivButton>
                </DivMain>
              </SectionPage>
            </div>
          )
      }
    </>
  )
}


const Button = styled.button`
width:80px;  
height: 30px;
border-radius: 30px;
font-size:15px;
border: 1px solid ${props => props.theme.borderColor};
background:${props => props.theme.background};
cursor:pointer;
color:${props => props.theme.color};
&:hover{
  background:${props => props.theme.pokeballColor};
  color:white;
  transition: 0.4s ease-in-out;
}
`

const H1 = styled.h1`
font-size:25px;
font-weight: 700;
`

const SectionPage = styled.section`
width: 100vw;

`

const Header = styled.header`
padding:10px;
display:flex;
justify-content: space-between;
align-items: center;

`
const DivHeader = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:10px;
color:#F2F5F5;
${props => props.fil && css`
gap:5px;
margin-right:15px;
`}
`
const DivMain = styled.div`
display:flex;
justify-content: center;
@media (max-width: 768px) {
  flex-direction: column;
  align-items: center;
}
`
const DivButton = styled.div`
display:flex;
flex-direction: column;
gap:10px;
margin:20px 0 0 5%;
@media (max-width: 768px) {
  display:block;
}
`

const Ul = styled.ul`

display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
gap:10px;
margin-top:15px;
border-radius:25px;


}

`

const Li = styled.li`
display:flex;
justify-content: space-between;
align-items: center;
margin:5px;
width: 500px;
height:55px;
color:${props => props.theme.color};
text-transform: capitalize;
font-size:20px;
border-radius:50px;
font-weight: 500;
@media (max-width: 830px) {
  width: 350px;;
}

&:hover{
  background:${props => props.theme.cardHover};
  color:${props => props.theme.colorHover};
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  transition: 0.4s ease-in-out;
  
}`

const PFont = styled.p`
font-size:24px;
${props => props.white && css`
font-size:20px;
transform:rotate(180deg);
}
`}
`

const Div = styled.div`
display:flex;
align-items: center;
${props => props.second && css`
with:155px;
gap:15px;
margin-right:25px;

`}
`
const DivButtonBotton = styled.div`
display:flex;
justify-content: space-around;
align-items:center;
height:57px;

`

const ImgPoke = styled.img`
width:90px;
`

export { PokemonList }



