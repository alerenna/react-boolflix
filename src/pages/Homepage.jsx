import { useState } from "react"
import { useMoviesContext } from "../contexts/GlobalContext"
import Header from "../components/Header";

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

const genreIdToName = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
}

export default function Homepage() {

    const { movies, setQuery, setMovieId, cast, setMediaType } = useMoviesContext()
    const [selecteMovieId, setSelectedMovieId] = useState(null)

    console.log('CAST:', cast);



    return (
        <>



            < Header />

            <main>
                <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 mt-3">
                    {movies.map(movie => (
                        <div key={movie.id} className="col">
                            <div className="card h-100">
                                <div className="card_body">
                                    <img className="poster card-img" src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} alt="" />

                                    <div className="movie-infos">

                                        <h5>{movie.title ? movie.title : movie.name}</h5>
                                        <p className="original-title">{movie.original_title ? movie.original_title : movie.original_name}</p>

                                        {/* Language & vote logic */}
                                        <div className="language_vote d-flex justify-content-between">
                                            {/* Language to flag */}

                                            {languageToCountry[movie.original_language] ? (

                                                <img src={`https://flagsapi.com/${languageToCountry[movie.original_language]}/flat/32.png`} alt={movie.original_language}></img>
                                            ) : (
                                                <span>{movie.original_language.toUpperCase()}</span>
                                            )}



                                            {/* Function for vote to 5 stars */}
                                            {
                                                (() => {
                                                    const vote = Math.ceil(movie.vote_average / 2)
                                                    const stars = []

                                                    for (let i = 1; i <= 5; i++) {
                                                        if (i <= vote) {
                                                            stars.push(<i key={i} className="bi bi-star-fill full"></i>)
                                                        } else {

                                                            stars.push(<i key={i} className="bi bi-star empty"></i>)

                                                        }
                                                    }
                                                    return <div>{stars}</div>
                                                })()
                                            }
                                        </div>

                                        <p className="overview">{movie.overview}</p>

                                        {/* Show cast logic */}
                                        <div className="cast" onClick={() => {
                                            console.log('Clicked movie');

                                            setMovieId(movie.id)
                                            setSelectedMovieId(movie.id)

                                            if (movie.title) {
                                                setMediaType('movie')
                                            } else {
                                                setMediaType('tv')
                                            }
                                        }}>
                                            {selecteMovieId !== movie.id && <span>Show cast</span>}
                                            {selecteMovieId === movie.id && (
                                                <ul className="cast-list list-unstyled">
                                                    {cast.slice(0, 5).map(actor => (
                                                        <li className="actor" key={actor.id}>{actor.name}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        {/* Genres logic */}
                                        <div className="genre-container">
                                            <h6 className="genres-title mt-2">Genres</h6>
                                            {movie.genre_ids.map(id =>
                                                <span className="genre" key={id} > {genreIdToName[id]} </span>
                                            )}

                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    ))}
                </div >
            </main >



        </>
    )

}