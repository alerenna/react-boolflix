import { useState } from "react"
import { useMoviesContext, GlobalProvider } from "./contexts/GlobalContext"


const languageToCountry = {
  en: 'US',
  it: 'IT',
  fr: 'FR',
  de: 'DE',
  ja: 'JP',
  es: 'ES',
  zh: 'CN',
  ko: 'KR',
  ru: 'RU',
  pt: 'PT',
  hi: 'IN',
  sv: 'CH',
};

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
          <input
            type="text"
            className="form-control"
            name="search-bar"
            id="search-bar"
            aria-describedby="searchMovieHelper"
            placeholder="Search a movie"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <button onClick={handleMovieSearch} className="btn btn-primary mb-3">Search</button>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {movies.map(movie => (
          <div key={movie.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <img className="poster" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />
                <h4>{movie.title ? movie.title : movie.name}</h4>
                <p>{movie.original_title ? movie.original_title : movie.original_name}</p>
                <img
                  src={
                    languageToCountry[movie.original_language]
                      ? `https://flagsapi.com/${languageToCountry[movie.original_language]}/flat/32.png`
                      : 'https://via.placeholder.com/32?text=?'
                  }
                  alt={movie.original_language}
                />
                <p>{movie.original_language.toUpperCase()}</p>
                <p>{movie.vote_average}</p>

              </div>
            </div>
          </div>

        ))}
      </div >


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
