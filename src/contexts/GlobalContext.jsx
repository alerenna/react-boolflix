import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

//Custom Provider
function GlobalProvider({ children }) {

    return (
        <GlobalContext.Provider value={{ movies }}>
            {children}
        </GlobalContext.Provider>
    )
}

//Create custom fetch hook for movies

function useFetchMovies() {

    const [movies, setMovies] = useState('')
    const api_key = import.meta.env.MOVIE_DB_API_KEY;
    const base_movies_api_url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchText}`;

    useEffect(() => {

        fetch(base_movies_api_url)
            .then(res => res.json())
            .then(data => {
                setMovies(data)
            })

    }, [])

}

//Custom hook context
function useMovies() {
    const context = useContext(GlobalContext)
    return context
}

//Export Provider and Hook context
export { GlobalProvider, useMovies }