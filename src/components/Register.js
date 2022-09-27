import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { getAll } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

const authURL = "https://movie-mania12.herokuapp.com/api/auth/register";
const usersURL = "https://movie-mania12.herokuapp.com/api/users";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [existingUser, setExistingUser] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users } = await getAll(usersURL);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setExistingUser(false);

    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const register = async (e) => {
    e.preventDefault();
    const foundUser = users.find((x) => x.username === user.username);

    if (foundUser) {
      setExistingUser(true);
    } else {
      const { data } = await axios.post(authURL, user);
      console.log(data);
      navigate("/");
    }
  };

  return (
    <div className="loginPage">
      <div className="LoginForm">
        <div className="logo">
        <FontAwesomeIcon icon={faVideoCamera} />
          <h1>Movie Mania</h1>
          
        </div>{" "}
        <br />
        <form onSubmit={register}>
          <h2>Sign Up</h2>
          {existingUser ? <span>Username Exists</span> : null}
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                placeholder="Fullname"
                name="fullname"
                onChange={handleChange}
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input
                class="input"
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleChange}
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
              <span class="icon is-small is-right">
                <i class="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input
                class="input"
                type="text"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control">
              <div className="buttonDiv">
                <input type="submit" value="Register" className="loginBtn" />
                <p>
                  Already Member?{" "}
                  <span>
                    <Link to="/">Sign In Now!</Link>
                  </span>
                </p>
              </div>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
