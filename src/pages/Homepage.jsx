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

                                        <h4>{movie.title ? movie.title : movie.name}</h4>
                                        <p>{movie.original_title ? movie.original_title : movie.original_name}</p>
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


                                    </div>


                                </div>
                            </div>
                        </div>
                    ))}
                </div >
            </main>



        </>
    )

}