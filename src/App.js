import './App.css';
import { AppRoutes } from './pages/routes';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from "./contexts/theme-context"


function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider>
        < AppRoutes />
      </ThemeProvider>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}

a{
  text-decoration: none;
  color:black
}

li{
  list-style:none;
}
`

export default App;
