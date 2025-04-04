import { createContext, useState, useContext, useEffect } from "react";

const GlobalContext = createContext()

//Custom Provider
function GlobalProvider({ children }) {
    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    useEffect(() => {

        const api_key = import.meta.env.VITE_MOVIE_DB_API_KEY;
        const base_movies_api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}`;
        const base_series_api_url = `https://api.themoviedb.org/3/search/tv?api_key=${api_key}&query=${query}`;

        fetch(base_movies_api_url)
            .then(res => res.json())
            .then(moviesData => {

                fetch(base_series_api_url)
                    .then(res => res.json())
                    .then(seriesData => {

                        setMovies([...moviesData.results, ...seriesData.results])
                    })

                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })

    }, [query])






    return (
        <GlobalContext.Provider value={{ movies, setMovies, query, setQuery }}>
            {children}
        </GlobalContext.Provider>
    )
}


//Custom hook context
function useMoviesContext() {
    const context = useContext(GlobalContext)
    return context
}

//Export Provider and Hook context and Fetch
export { GlobalProvider, useMoviesContext }