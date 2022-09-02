import { useState, useEffect } from "react";
import { getById } from "../utils";
import { useNavigate, useParams } from "react-router-dom";

const moviesURL = "https://movie-mania12.herokuapp.com/api/movies";

function SpecificMovie() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    genres: [],
    imageurl: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data: movie } = await getById(moviesURL, id);
      setMovie(movie);
    };

    fetchData();
  }, []);

  const movieLi = movie.genres.map((gen) => {
    return <span>{gen} -</span>;
  });

  return (
    <div className="specificMovie">
      <div className="specificMovieCard">
        <img alt="" src={movie.imageurl} />

        <div className="specificContent">
          <h1>
            {movie.name} - {movie.premiered}{" "}
          </h1>{" "}
          <br />
          <span>{movieLi}</span> <br />
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type book.
          </p>
          <button onClick={() => navigate("/movies")}> Back to homepage</button>
        </div>
      </div>
    </div>
  );
}

export default SpecificMovie;
