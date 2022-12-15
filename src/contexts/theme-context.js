import { createContext, useState, useEffect } from "react"

export const themes = {
    light: {
        bcHeader: "linear-gradient(135deg, #f0501d 47%, black 40%)",
        borderColor: "#D4D4D4",
        background: "#F5F8F5",
        ulBackground: "#F2F5F5",
        infoCard:"#FFFFF9",
        infoBackground:"#F5F8F5",
        cardHover: "linear-gradient(135deg, #f0501d 50%, black 40%)",
        pokeballColor: "#f0501d",
        color:"#black",
        colorHover:"white",

    },
    dark: {
        bcHeader: "linear-gradient(135deg, #9932CC 47%, #001 40%)",
        borderColor: "#363636",
        background: "#121212",
        ulBackground: "#141414",
        infoCard:"#121212",
        infoBackground:"black",
        cardHover: "linear-gradient(135deg, #9932CC 50%, #001 40%)",
        pokeballColor: "#9932CC",
        color:"#F8F8F0",
        colorHover:"white",

    }

}

export const ThemeContext = createContext({})

export const ThemeProvider = (props) => {

    const getTheme=()=>{
        return JSON.parse(localStorage.getItem("theme")) || false
    }

    const [theme, setTheme] = useState(getTheme())
    
    useEffect(() => {
        localStorage.setItem("theme", JSON.stringify(theme))
    }, [theme])
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {props.children}
        </ThemeContext.Provider>
    )
}