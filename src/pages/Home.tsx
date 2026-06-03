import { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'

interface PokemonEntry {
  name: string
  url: string
}

export default function Home() {
  const [pokemon, setPokemon] = useState<PokemonEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((r) => {
        if (!r.ok) throw new Error('Error al cargar la lista')
        return r.json()
      })
      .then((data) => setPokemon(data.results))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <div className="status">Cargando Pokémon...</div>
  if (error) return <div className="status error">Error: {error}</div>

  return (
    <div className="page">
      <h1>Pokédex</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Buscar por nombre..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {filtered.length === 0 ? (
        <p className="status">No se encontraron Pokémon.</p>
      ) : (
        <div className="pokemon-grid">
          {filtered.map((p) => (
            <PokemonCard key={p.name} name={p.name} url={p.url} />
          ))}
        </div>
      )}
    </div>
  )
}
