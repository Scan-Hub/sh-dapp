import "./table.scss"
import { map } from "lodash"
import React, { useEffect } from "react"
import { usePagination, useSortBy, useTable } from "react-table"
import iconStar from "../../../assets/images/block-list/star.svg"
import iconVerified from "../../../assets/images/block-list/verified.svg"
import iconProject from "../../../assets/images/block-list/icon-chain.png"
import iconBinance from "../../../assets/images/block-list/icon-binance.png"
import iconUp from "../../../assets/images/card/arrow-up.svg"
import iconDown from "../../../assets/images/card/arrow-down.svg"
import iconSortDown from "../../../assets/images/block-list/sort-down.svg"

import { NavLink } from "react-router-dom"

export const ProjectNameCell = ({ data }) => {
  return (
    <div className="project-name-cell sm:space-x-2 space-x-1">
      <div className="w-[48px]">
        <img
          src={data.project_logo}
          alt={data.project_name}
          className="!h-auto"
        />
      </div>
      <div className="project-name-cell__name">
        {/* {data.verified && (
          <img src={iconVerified} alt="" className="sm:ml-2 ml-1" />
        )} */}
        <p>{data.project_name}</p>
      </div>
    </div>
  )
}
export const ChainCell = ({ data }) => {
  return (
    <div className="chain-cell">
      {data.icon && <img src={iconBinance} alt="" />}
      <p>{data.name}</p>
    </div>
  )
}
export const ChangeCell = ({ data }) => {
  if (data.percent) {
    return (
      <div className={`change-cell ${data.status === "up" ? "up" : "down"}`}>
        <img src={data.status === "up" ? iconUp : iconDown} alt="" />
        <p>{data.percent}</p>
      </div>
    )
  }
  return <p>-</p>
}
export const Vote24hCell = ({ data }) => {
  return (
    <div className={`change-cell ${data.status === "up" ? "up" : "down"}`}>
      <img src={data.status === "up" ? iconUp : iconDown} alt="" />
      <p>{data.value}</p>
    </div>
  )
}
export const RatingCell = ({ data }) => {
  return (
    <div className={`rating-cell ${data}`}>
      <p>{data}</p>
    </div>
  )
}
export const FavoriteCell = ({ data }) => {
  if (data) {
    return <img src={iconStar} alt="" />
  }
  return <></>
}

const Table = ({ columns, data, pageSizeProps, styleTitleColumns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: pageSizeProps }
    },
    useSortBy,
    usePagination
  )

  useEffect(() => {
    setPageSize(pageSizeProps)
  }, [pageSizeProps, setPageSize])

  return (
    <div className="overflow-x-auto">
      <table
        className="table-home min-w-full"
        {...getTableProps()}
        cellPadding="16"
        cellSpacing={0}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th 
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${
                    styleTitleColumns ? styleTitleColumns : "bg-box-bg"
                  } whitespace-nowrap  sm:text-base text-sm`}
                >
                  {column.render("Header")}
                  <span>
                    {column.disableSortBy ? (
                      ""
                    ) : column.isSortedDesc ? (
                      <img
                        className="icon-sort icon-sort-up"
                        src={iconSortDown}
                        alt=""
                      />
                    ) : (
                      <img className="icon-sort" src={iconSortDown} alt="" />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="sm:text-base text-sm"
                    >
                      <NavLink to="/project">{cell.render("Cell")}</NavLink>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
      {data.length > pageSizeProps && (
        <div className="pagination">
          <button
            className={`pagination__item pagination__prev ${
              canPreviousPage ? "active" : ""
            }`}
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
                      <p
                        className={`pagination__item pagination__number ${
                          pageIndex === item ? "active" : ""
                        }`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        {item + 1}
                      </p>
                    )}
                    {item === 6 && (
                      <p
                        className={`pagination__item pagination__number`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        ...
                      </p>
                    )}
                    {item > pageOptions.length - 5 && (
                      <p
                        className={`pagination__item pagination__number ${
                          pageIndex === item ? "active" : ""
                        }`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        {item + 1}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    {item < 5 && (
                      <p
                        className={`pagination__item pagination__number ${
                          pageIndex === item ? "active" : ""
                        }`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        {item + 1}
                      </p>
                    )}
                    {item === 6 && (
                      <p
                        className={`pagination__item pagination__number`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        ...
                      </p>
                    )}
                    {item > pageOptions.length - 5 && (
                      <p
                        className={`pagination__item pagination__number ${
                          pageIndex === item ? "active" : ""
                        }`}
                        onClick={() => {
                          gotoPage(item)
                        }}
                        key={item}
                      >
                        {item + 1}
                      </p>
                    )}
                  </>
                )}
              </>
            ) : (
              <p
                className={`pagination__item pagination__number ${
                  pageIndex === item ? "active" : ""
                }`}
                onClick={() => {
                  gotoPage(item)
                }}
                key={item}
              >
                {item + 1}
              </p>
            )
          })}
          <button
            className={`pagination__item pagination__next ${
              canNextPage ? "active" : ""
            }`}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            {"Next >"}
          </button>
        </div>
      )}
    </div>
  )
}
export default Table
