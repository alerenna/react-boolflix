import { useState } from "react"
import { useMoviesContext, GlobalProvider } from "./contexts/GlobalContext"


function Content() {
  const { movies, setQuery } = useMoviesContext()
  const [searchInput, setSearchInput] = useState('')


  const handleMovieSearch = () => {

    setQuery(searchInput)

  }

  return (
    <>

      <div className="container">

        <div className="mb-3">
          <label htmlFor="" className="form-label"></label>
          <input
            type="text"
            className="form-control"
            name="search-bar"
            id="search-bar"
            aria-describedby="helpId"
            placeholder="Search a movie"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <button onClick={handleMovieSearch} className="btn btn-primary">Search</button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {movies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h4>{movie.title}</h4>
                <p>{movie.original_title}</p>
                <img src={movie.original_language === 'en' ? `https://flagsapi.com/US/flat/32.png` : `https://flagsapi.com/${movie.original_language.toUpperCase()}/flat/32.png`}></img>
                <p>{movie.original_languag}</p>
                <p>{movie.vote_average}</p>

              </div>
            </div>
          </div>

        ))}
      </div>


    </>
  )
}

export default function App() {

  return (
    <GlobalProvider>
      <Content />
    </GlobalProvider>
  )
}
