import styled, { css } from "styled-components"
import { Link } from "react-router-dom"
import { ThemeContext } from "../../../contexts/theme-context"
import { useContext } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faCodeCommit } from '@fortawesome/free-solid-svg-icons'
import { ButtonHandleList } from "../button/buttonHandleList/button"

export function PokeList({ pokedex, prev, next }) {

  const { theme } = useContext(ThemeContext)

  return (
    <div>
      <Ul >
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
      <ButtonHandleList prev={prev} next={next} />
    </div>


  )
}

const Ul = styled.ul`
display:flex;
flex-direction:column;
justify-content: center;
align-items: center;
gap:10px;
margin-top:15px;
border-radius:25px;
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

const Div = styled.div`
display:flex;
align-items: center;
${props => props.second && css`
with:155px;
gap:15px;
margin-right:25px;
`}
`

const ImgPoke = styled.img`
width:90px;
`
const PFont = styled.p`
font-size:24px;
${props => props.white && css`
font-size:20px;
transform:rotate(180deg);
`}
`