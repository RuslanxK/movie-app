import { useState, useEffect, useReducer } from "react";
import Member from "./Member";
import { getAll, getByName } from "../utils";
import PaginationMembers from "./PaginationMembers";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson } from "@fortawesome/free-solid-svg-icons";

const membersURL = "https://movie-mania-application.herokuapp.com/api/members";

function Members() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(4);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = members.slice(indexOfFirstMember, indexOfLastMember);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    var query = window.location.search.substring(1);

    if (query) {
      const fetchMember = async () => {
        setLoading(true);
        const { data: member } = await getByName(membersURL, query);
        setMembers(member);
        setLoading(false);
      };
      fetchMember();
    } else {
      const fetchData = async () => {
        setLoading(true);
        const { data: members } = await getAll(membersURL);
        setMembers(members);
        setFilteredMembers(members);
        setLoading(false);
      };

      fetchData();
    }
  }, [reducerValue]);

  const handleChange = (e) => {
    setSearchVal(e.target.value);
  };

  const searchMember = (e) => {
    e.preventDefault();
    setFilteredMembers([
      ...members.filter(
        (member) =>
          member.name.toLowerCase().startsWith(searchVal) ||
          member.email.toLowerCase().startsWith(searchVal)
      ),
    ]);
  };

  if (loading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  const reRenderMembers = (value) => {
    if (value === true) {
      forceUpdate();
    }
  };

  

  const memberComp = currentMembers.map((member) => {
    return (
      <Member key={member._id} member={member} callback={reRenderMembers} />
    );
  });

  const filtered = filteredMembers.map((member) => {
    return (
      <Member key={member._id} member={member} callback={reRenderMembers} />
    );
  });

  return (
    <div>
      <div className="searchBar">
        <div>
          <input
            type="text"
            placeholder="Search"
            onChange={handleChange}
            onKeyUp={searchMember}
          />
        </div>
      </div>

      <div className="btns">
        <button className="addMemberBtn" onClick={() => navigate("/addmember")}>
          + <FontAwesomeIcon icon={faPerson} />
        </button>
      </div>

      <div className="subscriptionsPage">
        {searchVal ? filtered : memberComp}
      </div>

      {searchVal || members.length === 1 ? (
        ""
      ) : (
        <PaginationMembers
          membersPerPage={membersPerPage}
          totalMembers={members.length}
          paginate={paginate}
        />
      )}
    </div>
  );
}

export default Members;
