import clsx from "clsx"
import PropTypes from "prop-types"
import emptyContent from "../../assets/images/img_empty_content.png"

function SearchNotFound(props) {
  const { query, className } = props
  return (
    <div className={clsx("w-full", className)}>
      <div className="flex flex-col items-center justify-center">
        <img src={emptyContent} alt="empty_content" />
        <div className="w-[400px] text-center translate-y-[-48px]">
          <p
            className="text--semibold-2xl le text-green-text-profile mb-4"
            style={{ letterSpacing: 6 }}
          >
            {query ? `No results for '${query}'` : "No data available"}
          </p>
          {query && (
            <>
              <p className="text--regular">
                We couldn't find anything matching your search.
              </p>
              <p className="text--regular">Try again with a different term.</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

SearchNotFound.propTypes = {
  className: PropTypes.string,
  query: PropTypes.string
}

export default SearchNotFound
