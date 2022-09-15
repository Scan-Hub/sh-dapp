import map from "lodash/map"

import PropTypes from "prop-types"

function Pagination(props) {
  const {
    canPreviousPage,
    previousPage,
    pageOptions,
    pageIndex,
    canNextPage,
    gotoPage,
    nextPage
  } = props

  return (
    <div className="pagination">
      <button
        className={`pagination__prev ${canPreviousPage ? "active" : ""}`}
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        {"< Prev"}
      </button>
      {map(pageOptions, (item) => {
        return pageOptions.length > 10 ? (
          <>
            {pageIndex > 5 ? (
              <>
                {item < 5 && (
                  <div
                    className={`pagination__item pagination__number ${
                      pageIndex === item ? "active" : ""
                    }`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    {item + 1}
                  </div>
                )}
                {item === 6 && (
                  <div
                    className={`pagination__item pagination__number`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    ...
                  </div>
                )}
                {item > pageOptions.length - 5 && (
                  <div
                    className={`pagination__item pagination__number ${
                      pageIndex === item ? "active" : ""
                    }`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    {item + 1}
                  </div>
                )}
              </>
            ) : (
              <>
                {item < 5 && (
                  <div
                    className={`pagination__item pagination__number ${
                      pageIndex === item ? "active" : ""
                    }`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    {item + 1}
                  </div>
                )}
                {item === 6 && (
                  <div
                    className={`pagination__item pagination__number`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    ...
                  </div>
                )}
                {item > pageOptions.length - 5 && (
                  <div
                    className={`pagination__item pagination__number ${
                      pageIndex === item ? "active" : ""
                    }`}
                    onClick={() => {
                      gotoPage(item)
                    }}
                    key={item}
                  >
                    {item + 1}
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div
            className={`pagination__item pagination__number ${
              pageIndex === item ? "active" : ""
            }`}
            onClick={() => {
              gotoPage(item)
            }}
            key={item}
          >
            {item + 1}
          </div>
        )
      })}
      <button
        className={`pagination__next ${canNextPage ? "active" : ""}`}
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        {"Next >"}
      </button>
    </div>
  )
}

Pagination.propTypes = {
  canPreviousPage: PropTypes.bool,
  previousPage: PropTypes.func,
  pageOptions: PropTypes.any,
  pageIndex: PropTypes.any,
  canNextPage: PropTypes.bool,
  gotoPage: PropTypes.func,
  nextPage: PropTypes.func
}

export default Pagination
