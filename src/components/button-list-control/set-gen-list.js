import styled from "styled-components"
import { ThemeContext } from "../../contexts/theme-context"
import { useContext } from "react"


export const Gen1Button = ({ offSet, setOffSet }) => {
  const { theme, setTheme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet === 0 ? offSet = 0 : offSet = 0)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen I</Button>
  )
}
export const Gen2Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 151)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen II</Button>
  )
}
export const Gen3Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 251)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen III</Button>
  )
}
export const Gen4Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 386)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen IV</Button>
  )
}
export const Gen5Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 494)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen V</Button>
  )
}
export const Gen6Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 649)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen VI</Button>
  )
}
export const Gen7Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 721)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen VII</Button>
  )
}
export const Gen8Button = ({ offSet, setOffSet }) => {
  const { theme } = useContext(ThemeContext)
  const handleClick = () => setOffSet(offSet = 809)

  return (
    <Button theme={theme} onClick={() => handleClick()}> Gen VIII</Button>
  )
}

const Button = styled.button`
    
  width:80px;  
  height: 30px;
  border-radius: 30px;
  font-size:18px; 
  font-weight: 600;
  border: none;
  background:${props => props.theme.background};
  cursor:pointer;
  color:${props => props.theme.color};

  &:hover{
    background:${props => props.theme.pokeballColor};
    color:white;
    transition: 0.4s ease-in-out;
  }
  `