import React from "react";
import { Link } from "react-router-dom";

function AllSubscribersWatched({ subscribers, movie, members }) {
  const subscribedMembers = subscribers.map((subscriber) => {
    let foundSubscriber = members.find(
      (member) => member._id === subscriber.memberid
    );

    if (subscriber.movieid === movie._id && foundSubscriber) {
      return (
        <span key={subscriber._id}>
          <Link to={`/members/?${foundSubscriber.name}`}>
            {foundSubscriber.name}
          </Link>{" "}
          - {subscriber.date}
        </span>
      );
    }
  });

  return (
    <div className="subsWatched">
      <h3>Subscribers Watched</h3>

      {subscribedMembers}
    </div>
  );
}

export default AllSubscribersWatched;
