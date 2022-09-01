import React from "react";

const PaginationMembers = ({ membersPerPage, totalMembers, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMembers / membersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => {
        return (
          <button onClick={() => paginate(number)} id="paginationBtn">
            {number}
          </button>
        );
      })}
    </div>
  );
};

export default PaginationMembers;
