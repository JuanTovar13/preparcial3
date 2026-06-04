import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { Navbar } from './components/Navbar'
import { Home } from './pages/Home'
import { PokemonDetail } from './pages/PokemonDetail'
import { Analysis } from './pages/Analysis'
import './App.css'

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} />
            <Route path="/analysis" element={<Analysis />} />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  )
}

