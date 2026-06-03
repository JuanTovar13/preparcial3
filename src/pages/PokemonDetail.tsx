import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { addPokemon } from '../store/analysisSlice'

interface PokemonData {
  id: number
  name: string
  height: number
  weight: number
  sprites: { other: { 'official-artwork': { front_default: string } } }
  types: { type: { name: string } }[]
  abilities: { ability: { name: string } }[]
}

export default function PokemonDetail() {
  const { name } = useParams<{ name: string }>()
  const dispatch = useAppDispatch()
  const analysisList = useAppSelector((s) => s.analysis.list)

  const [data, setData] = useState<PokemonData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((r) => {
        if (!r.ok) throw new Error('Pokémon no encontrado')
        return r.json()
      })
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [name])

  if (loading) return <div className="status">Cargando...</div>
  if (error) return <div className="status error">Error: {error}</div>
  if (!data) return null

  const image = data.sprites.other['official-artwork'].front_default
  const types = data.types.map((t) => t.type.name)
  const abilities = data.abilities.map((a) => a.ability.name)

  const alreadyAdded = analysisList.some((p) => p.id === data.id)
  const isFull = analysisList.length >= 4

  const handleAdd = () => {
    dispatch(addPokemon({ id: data.id, name: data.name, image, height: data.height, weight: data.weight, types }))
  }

  return (
    <div className="page detail-page">
      <div className="detail-card">
        <img src={image} alt={data.name} className="detail-image" />
        <div className="detail-info">
          <h1>{data.name} <span className="pokemon-id">#{data.id}</span></h1>
          <div className="type-list">
            {types.map((t) => (
              <span key={t} className={`type-badge type-${t}`}>{t}</span>
            ))}
          </div>
          <div className="stats-grid">
            <div className="stat"><span>Altura</span><strong>{data.height / 10} m</strong></div>
            <div className="stat"><span>Peso</span><strong>{data.weight / 10} kg</strong></div>
          </div>
          <div className="abilities">
            <h3>Habilidades</h3>
            <ul>
              {abilities.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
          {alreadyAdded ? (
            <p className="already-added">Ya está en la lista de análisis</p>
          ) : isFull ? (
            <p className="already-added">Lista de análisis llena (máx. 4)</p>
          ) : (
            <button className="btn btn-success" onClick={handleAdd}>
              + Agregar al análisis
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
