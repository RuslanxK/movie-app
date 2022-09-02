import { useState } from "react";
import { addItem } from "../utils";

const subscriptionsURL =
  "https://movie-mania12.herokuapp.com/api/subscriptions";

function SubscribeToMovie({ member, subscribers, movies, test }) {
  const [subscription, setSubscription] = useState({ name: "", date: "" });
  const [addedDate, setAddedDate] = useState(false);

  const moviesWatched = movies.map((movie, index) => {
    let foundSubscription = subscribers.find(
      (subscriber) =>
        subscriber.movieid === movie._id && subscriber.memberid === member._id
    );

    if (!foundSubscription) {
      return (
        <option value={movie.name} key={index}>
          {movie.name}
        </option>
      );
    }
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setSubscription({ ...subscription, [name]: value });
  };

  const subscribe = async (e) => {
    e.preventDefault();
    let movieid;

    for (let i = 0; i < movies.length; i++) {
      if (movies[i].name === subscription.name) {
        movieid = movies[i]._id;
      }
    }

    if (movieid.length) {
      const obj = {
        movieid: movieid,
        memberid: member._id,
        date: subscription.date,
      };

      const addSub = await addItem(subscriptionsURL, obj);

      console.log(addSub);
      setAddedDate(true);
      e.target.reset();

      test(true);

      setTimeout(() => {
        setAddedDate(false);
      }, 2000);
    }
  };

  return (
    <div className="subscribeDiv">
      <form onSubmit={subscribe}>
        <div>
          <select name="name" onChange={handleChange} required>
            <option value="">Select Movie...</option>
            {moviesWatched}
          </select>
        </div>
        <input
          required
          type="date"
          placeholder="Date..."
          name="date"
          onChange={handleChange}
        />{" "}
        <br />
        <input type="submit" value="Subscribe" class="subscribeBtn" />
        <div className="AddedText">
          {addedDate ? <span>Added Successfully !</span> : null}
        </div>
      </form>
    </div>
  );
}

export default SubscribeToMovie;
