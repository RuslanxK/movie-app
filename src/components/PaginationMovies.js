import React from "react";

const PaginationMovies = ({ moviesPerPage, totalMovies, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
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

export default PaginationMovies;
