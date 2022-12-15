import { useContext } from "react"
import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"

export const Button = (props) => {

  const { theme } = useContext(ThemeContext)

  return (
    <ButtonStyle {...props} theme={theme} />
  )
}



const ButtonStyle = styled.button`
border:none;
width:75px;
padding:10px;
border-radius:25px;
margin:15px 15px 0 0;
border: 1px solid ${props => props.theme.borderColor};
background:${props => props.theme.background};
cursor:pointer;
color:${props => props.theme.color};
@media (max-width: 768px) {
  padding:5px;
}
&:hover{
  background:${props => props.theme.pokeballColor};
  color:white;
  transition: 0.4s ease-in-out;
}
`

