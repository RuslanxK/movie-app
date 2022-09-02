import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteItem, getAll } from "../utils";
import AllSubscribersWatched from "./AllSubscribersWatched";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faFilm } from "@fortawesome/free-solid-svg-icons";

const moviesURL = "https://movie-mania12.herokuapp.com/api/movies";
const subscriptionsURL =
  "https://movie-mania12.herokuapp.com/api/subscriptions";
const membersURL = "https://movie-mania12.herokuapp.com/api/members";

function Movie({ movie, callback }) {
  const [subscribers, setSubs] = useState([]);
  const [members, setMembers] = useState([]);
  const [movieHover, setMovieHover] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: subscribers } = await getAll(subscriptionsURL);
      setSubs(subscribers);

      const { data: members } = await getAll(membersURL);
      setMembers(members);
    };

    fetchData();
  }, []);

  const slicedGenres = movie.genres.slice(0, 2);

  const genresLi = slicedGenres.map((g) => {
    return <tag>{g}~</tag>;
  });

  const deleteMovie = async () => {
    const obj = await deleteItem(moviesURL, movie._id);
    console.log(obj.data);

    const foundSubscriptions = subscribers.filter(
      (subscriber) => subscriber.movieid === movie._id
    );

    if (foundSubscriptions) {
      foundSubscriptions.forEach((sub) => {
        const obj = deleteItem(subscriptionsURL, sub._id);
        console.log(obj);
      });
    }

    callback(true);
  };

  return (
    <div
      className="movie"
      onMouseOver={() => setMovieHover(true)}
      onMouseLeave={() => setMovieHover(false)}
    >
      <img alt="" src={movie.imageurl} />
      <span>{movie.name}</span>
      <div>
        <span>
          {genresLi} {movie.genres.length > 2 ? <tag>...</tag> : null}
        </span>
      </div>

      {movieHover ? (
        <div className="movie-icons">
          <FontAwesomeIcon
            icon={faEdit}
            id="edit-icon"
            onClick={() => navigate(`/editmovie/${movie._id}`)}
          />

          <FontAwesomeIcon
            icon={faTrash}
            id="delete-icon"
            onClick={deleteMovie}
          />
          <FontAwesomeIcon
            icon={faFilm}
            id="film-icon"
            onClick={() => navigate(`/movie/${movie._id}`)}
          />
        </div>
      ) : null}
      {movieHover ? (
        <AllSubscribersWatched
          subscribers={subscribers}
          movie={movie}
          members={members}
        />
      ) : null}
    </div>
  );
}

export default Movie;
