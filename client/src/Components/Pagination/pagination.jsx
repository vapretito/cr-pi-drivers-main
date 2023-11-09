import "./pagination.style.css";

const Pagination = ({
  driversPerPage,
  totalDrivers,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalDrivers / driversPerPage); i++) {
    pageNumbers.push(i);
  }

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);

  };
  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
    
  };
  const onSpecificPage = (n) => {
   
    setCurrentPage(n);
  };
 


  return (
    <>
      <nav className="pagination">
        <button
          className={`pagination-btn ${currentPage === 1 ? "is-disabled" : ""}`}
          onClick={onPreviousPage}
        >
          Previous
        </button>
        <ul className="pagination">
          {pageNumbers.map((noPage) => (
            <li key={noPage}>
              <a
                className={`pagination-link ${
                  noPage === currentPage ? "is-current" : ""
                }`}
                onClick={() => onSpecificPage(noPage)}
              >
                {noPage}
              </a>
            </li>
          ))}
        </ul>
        <button
          className={`pagination-btn ${
            currentPage >= pageNumbers.length ? "is-disabled" : ""
          }`}
          onClick={onNextPage}
        >
          Next
        </button>
      </nav>
    </>
  );
};

export default Pagination;