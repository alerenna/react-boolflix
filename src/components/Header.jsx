import { useState } from "react"
import { useMoviesContext } from "../contexts/GlobalContext"

export default function Header() {

    const [searchInput, setSearchInput] = useState('')
    const { movies, setQuery } = useMoviesContext()


    const handleMovieSearch = () => {

        setQuery(searchInput)
    }

    return (

        <>
            <header>

                <div className="container d-flex align-items-center justify-content-between py-4">

                    <span className="logo">
                        BOOLFLIX
                    </span>

                    <div className="container d-flex gap-3 justify-content-end">

                        <div>
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

                        <button onClick={handleMovieSearch} className="btn btn-danger">Search</button>
                    </div>

                </div>

            </header>


        </>


    )
}