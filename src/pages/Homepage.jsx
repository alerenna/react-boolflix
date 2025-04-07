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

    const { movies, setQuery } = useMoviesContext()


    return (
        <>



            < Header />
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
                        </div>
                    </div>

                ))}
            </div >


        </>
    )

}