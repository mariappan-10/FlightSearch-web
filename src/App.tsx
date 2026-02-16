import { useState, useEffect } from 'react'
import { getOrigins, getDestinations, searchFlights } from './api'
import type { Flight } from './api'
import './App.css'

function App() {
  const [tripType, setTripType] = useState<'one-way' | 'return'>('one-way')
  const [origins, setOrigins] = useState<string[]>([])
  const [destinations, setDestinations] = useState<string[]>([])
  const [origin, setOrigin] = useState('')
  const [destination, setDestination] = useState('')
  const [flights, setFlights] = useState<Flight[] | null>(null)
  const [selectedValues, setSelectedValues] = useState<string | null>(null)
  const [loading, setLoading] = useState<'origins' | 'destinations' | 'flights' | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading('origins')
    setError(null)
    getOrigins()
      .then(setOrigins)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(null))
  }, [])

  useEffect(() => {
    setDestination('')
    setDestinations([])
    if (!origin) return
    setLoading('destinations')
    setError(null)
    getDestinations(origin)
      .then(setDestinations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(null))
  }, [origin])

  const handleSearch = () => {
    setError(null)
    setFlights(null)
    setSelectedValues(`Origin: ${origin || '-'}, Destination: ${destination || '-'}, Trip: ${tripType}`)
    if (!origin || !destination) return
    setLoading('flights')
    searchFlights({ origin, destination })
      .then(setFlights)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(null))
  }

  return (
    <div className="flight-search">
      <h1>Flight Search</h1>
      <div className="form">
        <div className="row toggle-row">
          <button
            className={tripType === 'one-way' ? 'active' : ''}
            onClick={() => setTripType('one-way')}
          >
            One-way
          </button>
          <button
            className={tripType === 'return' ? 'active' : ''}
            onClick={() => setTripType('return')}
          >
            Return
          </button>
        </div>
        <div className="row">
          <label>
            Origin
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              disabled={loading === 'origins'}
            >
              <option value="">Select origin</option>
              {origins.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </label>
          <label>
            Destination
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              disabled={!origin || loading === 'destinations'}
            >
              <option value="">Select destination</option>
              {destinations.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </label>
        </div>
        {loading && (
          <p className="loading">{loading === 'origins' ? 'Loading origins...' : loading === 'destinations' ? 'Loading destinations...' : 'Searching flights...'}</p>
        )}
        {error && <p className="error">{error}</p>}
        <button className="search-btn" onClick={handleSearch} disabled={loading !== null}>
          Search
        </button>
      </div>
      {selectedValues && (
        <div className="results">
          <p className="selected">{selectedValues}</p>
          {flights !== null && (
            flights.length === 0
              ? <p className="no-flights">No flights found</p>
              : (
                <ul className="flight-list">
                  {flights.map((f) => (
                    <li key={f.id}>
                      {f.origin} → {f.destination} | {f.carrier} | {new Date(f.departure).toLocaleDateString()} | £{f.price}
                    </li>
                  ))}
                </ul>
              )
          )}
        </div>
      )}
    </div>
  )
}

export default App
