import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getById, updateItem } from "../utils";

const membersURL = "https://movie-mania-application.herokuapp.com/api/members";

function EditMember() {
  const [member, setMember] = useState({});
  const [updatingMember, setUpdatingMember] = useState(false);
  const [updatedMember, setUpdatedMember] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data: member } = await getById(membersURL, id);
      setMember(member);
    };

    fetchData();
  }, []);

  if (updatedMember) {
    return (
      <div className="loading" id="success">
        <h1>Updated Succesfully!</h1>
      </div>
    );
  }

  if (updatingMember) {
    return (
      <div className="loading">
        <h1>Updating...</h1>
      </div>
    );
  }

  const handleChange = (e) => {
    let { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const updateMember = async () => {
    setUpdatingMember(true);
    const updatedMember = await updateItem(membersURL, id, member);

    console.log(updatedMember.data);
    setUpdatingMember(false);
    setUpdatedMember(true);
    setTimeout(() => {
      setUpdatedMember(false);
    }, 2000);
  };

  return (
    <div className="addMember">
      <div className="addMemberForm">
        <h1>Edit Member</h1>
        <form className="form" onSubmit={updateMember}>
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleChange}
              value={member.name}
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
              onChange={handleChange}
              value={member.email}
            />{" "}
            <br />
          </div>
          <div>
            <label for="city" name="city" id="city">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={member.city}
            />
          </div>
          <div className="submitBtnDiv">
            <input type="submit" value="Update" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditMember;
