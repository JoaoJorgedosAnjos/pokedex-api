import React from 'react';
import { FilterType } from '../../filter-list/filter-list';
import styled, { css } from 'styled-components';
import DexLogo from '../../img/dexLogo.png'
import Logo from '../../img/logo.png'
import { ThemeContext } from '../../../contexts/theme-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeTogglerInfoButton } from '../../theme-toggler-button/theme-toggler-button';

export function Header({ tittle, types, pokedex, setPokedex }) {

  const { theme } = useContext(ThemeContext)
  return (
    <HeaderStyle style={{ background: theme.bcHeader }}>
      <DivHeader>
        <img src={DexLogo} alt="Pokédex logo" />
        <H1>{tittle}</H1>

      </DivHeader>
      <DivHeader>
        <img src={Logo} alt="Pokéball image" />
        <FilterType types={types} pokedex={pokedex} setPokedex={setPokedex} />
      </DivHeader>
    </HeaderStyle>

  )
}

export function HeaderInfoPoke({ tittle }) {

  const { theme } = useContext(ThemeContext)
  return (
    <HeaderInfo style={{ background: theme.bcHeader }}>
      <Link to="/">
        <DivHeader>
          <img src={DexLogo} />
          <H1>{tittle}</H1>
        </DivHeader>
      </Link>
      <ThemeTogglerInfoButton />
    </HeaderInfo>

  )
}

const HeaderStyle = styled.header`
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

const H1 = styled.h1`
font-size:25px;
font-weight: 700;
`
const HeaderInfo = styled.header`
display:flex;
justify-content: space-between;
align-items: center;
width:100%;
height:78px;
}
`