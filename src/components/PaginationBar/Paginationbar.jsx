import Pagination from "react-bootstrap/Pagination";

const PaginationBar = ({
  totalPages,
  currentPage,
  onFirstclickHandler,
  onPrevClickHandler,
  onNextClickHandler,
  onLastClickHandler,
}) => {
  return (
    <>
      <Pagination>
        <Pagination.First
          disabled={currentPage == 1}
          onClick={onFirstclickHandler}
        />
        <Pagination.Prev
          disabled={currentPage == 1}
          onClick={onPrevClickHandler}
        />
        <Pagination.Item disabled={currentPage == 1}>
          {currentPage - 1}
        </Pagination.Item>
        <Pagination.Item active>{currentPage}</Pagination.Item>
        <Pagination.Item disabled={currentPage == totalPages}>
          {currentPage + 1}
        </Pagination.Item>
        <Pagination.Next
          disabled={currentPage == totalPages}
          onClick={onNextClickHandler}
        />
        <Pagination.Last
          disabled={currentPage == totalPages}
          onClick={onLastClickHandler}
        />
      </Pagination>
    </>
  );
};
export default PaginationBar;
