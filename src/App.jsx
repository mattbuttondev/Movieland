import { useEffect, useState } from 'react'
import './App.css'
import SearchIcon from './assets/search.svg'
import MovieCard from './MovieCard'

function App() {
  const [movies, setMovies] = useState([])
  const [loadingMovies, setLoadingMovies] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  const searchMovies = async (title) => {
    setLoadingMovies(true)
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_REACT_OMDB_API_KEY}&s=${title}`)
    const data = await response.json()
    setMovies(data.Search)
    setLoadingMovies(false)
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className="app">
      <h1>Movieland</h1>

      <div className="search">
        <input placeholder='Search for movies' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} />
        <img src={SearchIcon} alt="Search" onClick={() => { searchMovies(searchTerm) }} />
      </div>

      <div className="container">
        {
          loadingMovies ?
            (<span className="loader"></span>)
            :
            movies?.length > 0 ? (
              movies.map((movie) => (
                <MovieCard movie={movie} key={movie.imdbID} />
              ))) : (<h3>No movies found</h3>)
        }
      </div>
    </div>
  )
}

export default App
