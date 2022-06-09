import cn from "classnames";
import PaginationIcon from "../../assets/images/prevIcon.svg";

function Pagination({ currentPage, numberOfPages, changePage }) {
  if (numberOfPages < 2) {
    return null;
  }
  const nextPage = currentPage + 1;
  const previousPage = currentPage - 1;
  return (
    <div className="pagination">
      <button
        onClick={() => changePage(previousPage)}
        disabled={currentPage === 1}
        className="pagination__changePageButton"
      >
        <PaginationIcon
          className={cn("pagination__icon", "pagination__prevIcon")}
        />
      </button>
      {currentPage !== 1 && (
        <button className="pagination__button" onClick={() => changePage(1)}>
          1
        </button>
      )}
      {currentPage > 3 && (
        <button className={cn("pagination__button", "pagination__dots")}>
          ...
        </button>
      )}
      {currentPage >= 3 && (
        <button
          className="pagination__button"
          onClick={() => changePage(previousPage)}
        >
          {previousPage}
        </button>
      )}
      <button className={cn("pagination__button", "pagination__currentPage")}>
        {currentPage}
      </button>
      {currentPage <= numberOfPages - 2 && (
        <button
          className="pagination__button"
          onClick={() => changePage(nextPage)}
        >
          {nextPage}
        </button>
      )}
      {currentPage <= numberOfPages - 3 && (
        <button className={cn("pagination__button", "dots")}>...</button>
      )}
      {!(currentPage === numberOfPages) && (
        <button
          className={"pagination__button"}
          onClick={() => changePage(numberOfPages)}
        >
          {numberOfPages}
        </button>
      )}
      <button
        onClick={() => changePage(nextPage)}
        disabled={currentPage === numberOfPages}
        className="pagination__changePageButton"
      >
        <PaginationIcon
          className={cn("pagination__icon", "pagination__nextIcon")}
        />
      </button>
    </div>
  );
}

export default Pagination;
