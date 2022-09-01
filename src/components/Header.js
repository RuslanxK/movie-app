import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera, faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getById } from "../utils";

const usersURL = "https://movie-mania-application.herokuapp.com/api/users";

const Header = () => {
  const [user, setUser] = useState({});

  const userId = sessionStorage["userid"];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: user } = await getById(usersURL, userId);
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <h1>Movie Mania</h1>
          <FontAwesomeIcon icon={faVideoCamera} />
        </div>

        <nav className="nav">
          
         
            <a onClick={() => navigate("/movies")}>Movies</a>
            <a onClick={() => navigate("/members")}>Members</a>
            <a onClick={() => console.log(user)}>About us</a>
          
        </nav>
        <div className="userInfo">
          <span id="fullname">
            <span id="icon"><FontAwesomeIcon icon={faUser} /> {user.fullname}</span>
          </span>
          <button className="logout" onClick={() => navigate("/")}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
