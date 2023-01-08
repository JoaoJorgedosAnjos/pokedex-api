import { useContext } from "react"
import { ThemeContext } from "../../../../contexts/theme-context"
import styled from "styled-components"

export function ButtonHandleList({prev, next}) {

    const { theme } = useContext(ThemeContext)

    return (
        <DivButtonBotton>
            <Button theme={theme} onClick={prev}>＜</Button>
            <Button theme={theme} onClick={next}>＞</Button>
        </DivButtonBotton>

    )
}

const DivButtonBotton = styled.div`
display:flex;
justify-content: space-around;
align-items:center;
height:57px;

`

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
