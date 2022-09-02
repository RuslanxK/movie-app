import axios from "axios";
import { useState, useEffect } from "react";
import { getAll } from "../utils";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideoCamera } from "@fortawesome/free-solid-svg-icons";

const authURL = "https://movie-mania12.herokuapp.com/api/auth/login";
const usersURL = "https://movie-mania12.herokuapp.com/api/users";

function Login() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data: users } = await getAll(usersURL);
      setUsers(users);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();

    const foundUser = users.find((x) => x.username === user.username);

    if (foundUser) {
      const { data } = await axios.post(authURL, user);
      sessionStorage["accessToken"] = data.accessToken;
      sessionStorage["userid"] = data.user;

      navigate("/movies");
    } else {
      setErrorMessage(true);
    }
  };

  const enter = () => {
    login();
  };

  return (
    <div className="loginPage">
      <div className="LoginForm">
        <div className="logo">
          <h1>Movie Mania</h1>
          <FontAwesomeIcon icon={faVideoCamera} />
        </div>{" "}
        <br />
        <h2>Sign In</h2>
        {errorMessage ? (
          <span style={{ color: "red" }}>Not existing user</span>
        ) : null}
        <form onSubmit={login}>
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
                <input
                  type="submit"
                  value="Sign In"
                  className="loginBtn"
                  onKeyDown={enter}
                />
                <br />
                <p>
                  New to Movie Mania?
                  <span>
                    <Link to="/register">Sign Up Now!</Link>
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

export default Login;
