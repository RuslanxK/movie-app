import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, updateItem } from "../utils";
import FileBase64 from "react-file-base64";
import Select from "react-select";
import options from "./GenresOptions";

const movieURL = "https://movie-mania-application.herokuapp.com/api/movies";

function EditMovie() {

  const { id } = useParams();

  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    genres: [],
    imageurl: "",
  });

  const [updatingMovie, setUpdatingMovie] = useState(false);
  const [updatedMovie, setUpdatedMovie] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data: movie } = await getById(movieURL, id);
      setMovie(movie);

      const arr = [];
      const gen = movie.genres.map((g) => {
        let obj = {};
        obj.value = g;
        obj.label = g;

        arr.push(obj);
      });

      setSelectedOption(arr);
    };

    fetchData();
  }, []);

  if (updatingMovie) {
    return (
      <div className="loading">
        <h1>Updating...</h1>
      </div>
    );
  }

  if (updatedMovie) {
    return (
      <div className="loading" id="success">
        <h1>Updated Succesfully!</h1>
      </div>
    );
  }

  const update = async (e) => {
    e.preventDefault();
    if (
      selectedOption.length === 0 ||
      movie.imageurl.length === 0 ||
      (selectedOption.length === 0 && movie.imageurl.length === 0)
    ) {
      setErrorMessage(true);
    } else {
      setUpdatingMovie(true);

      const arr = [];

      const option = selectedOption.map((option) => {
        arr.push(option.label);
      });

      const obj = {
        name: movie.name,
        premiered: movie.premiered,
        genres: arr,
        imageurl: movie.imageurl,
      };

      const updateData = await updateItem(movieURL, id, obj);

      console.log(updateData.data);
      setUpdatingMovie(false);
      setUpdatedMovie(true);

      setTimeout(() => {
        setUpdatedMovie(false);
      }, 2000);
    }
  };

  return (
    <div className="addMovie">
      <div className="addMovieForm">
        <h1>Edit Movie</h1>
        {errorMessage ? (
          <span style={{ color: "red" }}>All field are required !</span>
        ) : null}
        <form onSubmit={update}>
          <div className="form">
            <div>
              <label for="name">Name</label>
              <input
                type="text"
                required
                value={movie.name}
                onChange={(e) => setMovie({ ...movie, name: e.target.value })}
              />
              <br />
            </div>
            <div>
              <label for="premiered" name="premiered" id="premiered">
                Premiered
              </label>
              <input
                type="number"
                required
                min="1900"
                max="2022"
                value={movie.premiered}
                onChange={(e) =>
                  setMovie({ ...movie, premiered: e.target.value })
                }
              />
            </div>

            <div>
              <Select
                value={selectedOption}
                isMulti
                name="genres"
                options={options}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={setSelectedOption}
                required={true}
                placeholder="Select Genres"
              />
            </div>

            <div>
              <FileBase64
                multiple={false}
                id="image"
                value={movie.imageurl}
                onDone={({ base64 }) =>
                  setMovie({ ...movie, imageurl: base64 })
                }
              />
              <div className="submitBtnDiv">
                <input type="submit" value="Update" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMovie;
