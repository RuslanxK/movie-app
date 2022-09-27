import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import Movie from "./Movie";
import Pagination from "./PaginationMovies";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm } from "@fortawesome/free-solid-svg-icons";

const moviesURL = "https://movie-mania12.herokuapp.com/api/movies";

function Movies() {
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(11);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const accessToken = sessionStorage["accessToken"];

    const fetchData = async () => {
      setLoading(true);
      const { data: movies } = await axios.get(moviesURL, {
        headers: {
          "x-access-token": accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        
        },
      });

      setMovies(movies);
      setFilteredMovies(movies);
      setLoading(false);
    };

    fetchData();
  }, [reducerValue]);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  const reRenderMovies = (value) => {
    if (value === true) {
      forceUpdate();
    }
  };

  const movieComp = currentMovies.map((movie) => {
    return <Movie key={movie._id} movie={movie} callback={reRenderMovies} />;
  });

  const filtered = filteredMovies.map((movie) => {
    return <Movie key={movie._id} movie={movie} callback={reRenderMovies} />;
  });

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const searchMovie = (e) => {
    e.preventDefault();

    setFilteredMovies([
      ...movies.filter((movie) =>
        movie.name.toLowerCase().startsWith(searchVal)
      ),
    ]);
  };

  return (
    <div>
      <div className="hero">
        <div className="hero-text">
          <h1>Movie Mania</h1>
          <span>Watch Free Kids & Family Movies Online</span>
        </div>
      </div>
      <div className="searchBar">
        <div>
          <input
            type="text"
            onChange={handleChange}
            onKeyUp={searchMovie}
            placeholder="Search"
          />
        </div>
      </div>

      <div className="btns">
        <button className="addMovieBtn" onClick={() => navigate("/addmovie")}>
          + <FontAwesomeIcon icon={faFilm} />
        </button>
      </div>

      <div className="movies">{searchVal ? filtered : movieComp}</div>

      {searchVal ? (
        ""
      ) : (
        <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={movies.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default Movies;
