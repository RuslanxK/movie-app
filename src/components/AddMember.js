import { useState } from "react";
import { addItem } from "../utils";

const membersURL = "https://movie-mania-application.herokuapp.com/api/members";

function AddMember() {
  const [newMember, setNewMember] = useState({});
  const [addingMember, setAddingMember] = useState(false);
  const [addedMember, setAddedMember] = useState(false);

  if (addingMember) {
    return (
      <div className="loading">
        <h1>Adding Member...</h1>
      </div>
    );
  }

  if (addedMember) {
    return (
      <div className="loading" id="success">
        <h1>Added Succesfully!</h1>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const addMember = async () => {
    setAddingMember(true);
    const addedMember = await addItem(membersURL, newMember);
    console.log(addedMember);
    setAddingMember(false);
    setAddedMember(true);

    setTimeout(() => {
      setAddedMember(false);
    }, 2000);
  };

  return (
    <div className="addMember">
      <div className="addMemberForm">
        <h1>Add Member</h1>
        <form className="form" onSubmit={addMember}>
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              onChange={handleChange}
            />{" "}
            <br />
          </div>
          <div>
            <label for="email" name="email" id="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              onChange={handleChange}
            />{" "}
            <br />
          </div>
          <div>
            <label for="city" name="city" id="city">
              City
            </label>
            <input
              type="text"
              required
              name="city"
              id="city"
              onChange={handleChange}
            />
          </div>
          <div className="submitBtnDiv">
            <input type="submit" value="Add" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
