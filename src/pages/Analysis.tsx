import { useAppDispatch, useAppSelector } from '../store/hooks'
import { removePokemon } from '../store/analysisSlice'

export const Analysis = () => {
  const dispatch = useAppDispatch()
  const list = useAppSelector((s) => s.analysis.list)

  return (
    <div className="page">
      <h1>Lista de Análisis</h1>

      <div className="analysis-summary">
        <h2>Resumen</h2>
        <p>Total de Pokémon seleccionados: <strong>{list.length} / 4</strong></p>
        {list.length > 0 && (
          <p>Pokémon: {list.map((p) => p.name).join(', ')}</p>
        )}
      </div>

      {list.length === 0 ? (
        <p className="status">No hay Pokémon en la lista. Agrega desde la vista de detalle.</p>
      ) : (
        <div className="analysis-grid">
          {list.map((p) => (
            <div key={p.id} className="analysis-card">
              <img src={p.image} alt={p.name} />
              <h3>{p.name} <span className="pokemon-id">#{p.id}</span></h3>
              <div className="type-list">
                {p.types.map((t) => (
                  <span key={t} className={`type-badge type-${t}`}>{t}</span>
                ))}
              </div>
              <div className="stats-grid">
                <div className="stat"><span>Altura</span><strong>{p.height / 10} m</strong></div>
                <div className="stat"><span>Peso</span><strong>{p.weight / 10} kg</strong></div>
              </div>
              <button className="btn btn-danger" onClick={() => dispatch(removePokemon(p.id))}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

