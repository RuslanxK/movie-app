import { useState } from "react";
import { addItem } from "../utils";
import FileBase64 from "react-file-base64";
import Select from "react-select";
import options from "./GenresOptions";

const movieURL = "https://movie-mania12.herokuapp.com/api/movies";

function AddMovie() {
  const [movie, setMovie] = useState({
    name: "",
    premiered: "",
    imageurl: "",
  });
  const [uploading, setUploading] = useState(false);
  const [addedMovie, setAddedMovie] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  if (uploading) {
    return (
      <div className="loading">
        <h1>Uploading...</h1>
      </div>
    );
  }

  if (addedMovie) {
    return (
      <div className="loading" id="success">
        <h1>Succesfully Added!</h1>
      </div>
    );
  }

  const add = async (e) => {
    e.preventDefault();

    if (
      selectedOption == null ||
      movie.imageurl.length === 0 ||
      (selectedOption == null && movie.imageurl.length === 0)
    ) {
      setErrorMessage(true);
    } else {
      setUploading(true);

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

      const addData = await addItem(movieURL, obj);

      console.log(addData.data);

      setUploading(false);
      setAddedMovie(true);

      setTimeout(() => {
        setAddedMovie(false);
      }, 2000);
    }
  };

  return (
    <div className="addMovie">
      <div className="addMovieForm">
        <h1>Add Movie</h1>
        {errorMessage ? (
          <span style={{ color: "red" }}>All field are required !</span>
        ) : null}

        <form onSubmit={add}>
          <div className="form">
            <div>
              <label for="name">Name</label>
              <input
                type="text"
                required
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
                onChange={(e) =>
                  setMovie({ ...movie, premiered: e.target.value })
                }
              />
            </div>
            <div>
              <Select
                defaultValue={selectedOption}
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
                onDone={({ base64 }) =>
                  setMovie({ ...movie, imageurl: base64 })
                }
              />
              <div className="submitBtnDiv">
                <input type="submit" value="Add" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMovie;
