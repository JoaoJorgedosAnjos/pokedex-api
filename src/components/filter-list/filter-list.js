import styled from "styled-components";
import { getPokemonData } from "../../services/pokedex-list";
import { ThemeContext } from "../../contexts/theme-context";
import { useContext } from "react";

const FilterType = ({ types, setPokedex, offSet }) => {

    async function handleChange(event) {

        const typeSelected = event.target.value
        const pokemonTypes = types
        const typesPromises = pokemonTypes.map((index) => getPokemonData(index.url))
        const typeData = await Promise.all(typesPromises)
        const filterTypeSelected = typeData.filter((index) => index.name === typeSelected)
        const pokemonsListOfTypeSelected = filterTypeSelected[0].pokemon.map((index) => index.pokemon);
        const pokemonsDataOfTypePromises = pokemonsListOfTypeSelected.map((pokemon) => getPokemonData(pokemon.url));
        const pokemonsDataOfType = await Promise.all(pokemonsDataOfTypePromises);

        if (typeSelected) {
            setPokedex(pokemonsDataOfType)
        }
    }
    const { theme } = useContext(ThemeContext)

    return (
        <Div>
            <Label > FIlter types: </Label>
            <select onChange={handleChange}>
                <option ></option>
                {types.map((type, index) => {
                    return (
                        <option value={type.name} key={index}>{type.name}</option>
                    )
                })}

            </select>

            <Button theme={theme} onClick={() => window.location.reload(false)}><H2>All</H2></Button>
        </Div>
    )
}
const Label = styled.label`
font-size:18px;
font-weight: 500;
`
const H2 = styled.h2`
font-size:15px;
font-weight: 600;
`
const Div = styled.div`
display:flex;
gap:5px;

`
const Button = styled.button`
width:25px; 
height: 25px;
border-radius:50%;
border:1px white solid;
background:${props => props.theme.background};
cursor:pointer;
color:${props => props.theme.color};
&:hover{
    background:${props => props.theme.pokeballColor};
    color:white;
    transition: 0.4s ease-in-out;
  }
`


export { FilterType }