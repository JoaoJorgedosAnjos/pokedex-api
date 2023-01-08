import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./home"
import { PokemonDetails } from "./info"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path='/pokemon/:id' element={<PokemonDetails />} />
            </Routes>
        </BrowserRouter>
    )
}

export { AppRoutes }