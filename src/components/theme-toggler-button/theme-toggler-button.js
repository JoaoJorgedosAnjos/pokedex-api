import React, { useContext, useEffect, useState } from "react"
import styled   from "styled-components"
import { ThemeContext, themes } from "../../contexts/theme-context"
import { Button } from "../buttons/button"


export const ThemeTogglerButton = () => {

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <Div>
            <Button onClick={() => {
                setTheme(theme === themes.light ? themes.dark : themes.light)
            }} >Theme</Button>
        </Div>
    )
}



export const ThemeTogglerInfoButton = () => {  

    const { theme, setTheme } = useContext(ThemeContext)

    return (
        <DivInfo>
            <Button onClick={() => {
                setTheme(theme === themes.light ? themes.dark : themes.light)
            }} >Theme</Button>
        </DivInfo>
    )
}

const Div = styled.div`
position:absolute;
right:0;
padding-right:10px;
@media (max-width: 768px) {
    top:6%;
    padding-right:0px;
  }
`
const DivInfo = styled.div`
margin-left:10px;
`