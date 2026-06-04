import { Link } from 'react-router-dom'

interface Props {
  name: string
  url: string
}

const getIdFromUrl = (url: string): number => {
  const parts = url.replace(/\/$/, '').split('/')
  return parseInt(parts[parts.length - 1])
}

export const PokemonCard = ({ name, url }: Props) => {
  const id = getIdFromUrl(url)
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

  return (
    <div className="pokemon-card">
      <img src={image} alt={name} loading="lazy" />
      <h3>{name}</h3>
      <Link to={`/pokemon/${name}`} className="btn btn-primary">
        Ver detalle
      </Link>
    </div>
  )
}

