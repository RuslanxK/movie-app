import { useState, useEffect, useReducer } from "react";
import SubscribeToMovie from "./SubscribeToMovie";
import { getAll } from "../utils";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";

const moviesURL = "https://movie-mania-application.herokuapp.com/api/movies";
const subscribersURL = "https://movie-mania-application.herokuapp.com/api/subscriptions";

function SubscriberWatched({ member }) {
  const [display, setDisplay] = useState(true);
  const [movies, setMovies] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [buttonText, setButtonText] = useState("Subscribe");
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const accessToken = sessionStorage["accessToken"];
    const fetchData = async () => {
      const { data: movies } = await axios.get(moviesURL, {
        headers: {
          "x-access-token": accessToken,
        },
      });

      setMovies(movies);

      const { data: subscribers } = await getAll(subscribersURL);
      setSubscribers(subscribers);
    };

    fetchData();
  }, [reducerValue]);


  const test = (value) => {

    if (value === true) {
      forceUpdate();
    }
  };

  const handleClick = () => {
    setDisplay(!display);
    if (display === true) {
      setButtonText("Hide");
    } else {
      setButtonText("Subscribe");
    }
  };

  const moviesWatched = subscribers.map((subscriber) => {
    let foundMovie = movies.find((movie) => movie._id === subscriber.movieid);

    if (subscriber.memberid === member._id && foundMovie) {
      return (
        <li key={subscriber._id}>
          <Link to={`/movie/${foundMovie._id}`}>{foundMovie.name}</Link> -
          {subscriber.date}
        </li>
      );
    }
  });

  return (
    <div className="moviesWatched">
      <div>
        {" "}
        <br />
        <button class="subNewMovie" onClick={handleClick}>
          {buttonText} <FontAwesomeIcon id="calendar" icon={faCalendarPlus} />
        </button>
        <br />
      </div>

      {display ? null : (
        <SubscribeToMovie
          member={member}
          movies={movies}
          subscribers={subscribers}
          test={test}
        />
      )}

      <br />
      <div id="moviesWatched">
        <h3>Movies Watched :</h3>
        {moviesWatched}
      </div>
    </div>
  );
}

export default SubscriberWatched;
