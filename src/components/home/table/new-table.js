import React, { useCallback, useEffect } from "react"
import { usePagination, useSortBy, useTable } from "react-table"
import clsx from "clsx"
import { TailSpin } from "react-loading-icons"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import iconSortDown from "../../../assets/images/block-list/sort-down.svg"

import TablePagination from "./pagination"

import "./table.scss"

function ReactTable(props) {
  const {
    columns,
    data,
    headerClass,
    pagination,
    onPaginationChange,
    loading
  } = props
  const isEmpty = !data.length

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10
      },
      manualPagination: true,
      autoResetPage: false,
      pageCount: pagination.totalPages
    },
    useSortBy,
    usePagination
  )

  const handlePaginationChange = useCallback(() => {
    onPaginationChange({ page: pageIndex + 1, pageSize })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize])

  useEffect(() => {
    handlePaginationChange()
  }, [handlePaginationChange])
  
  return (
    <div
      className={clsx("relative overflow-x-auto cus_scrollbar scroll-smooth", {
        "min-h-[745px]": loading
      })}
    >
      {loading && (
        <div className="absolute w-full h-full top-0 left-0 flex flex-col items-center justify-center bg-black/20 text-green-text-profile">
          <TailSpin className="mb-2" fill="#00AF71" stroke="#00AF71" />
          Loading...
        </div>
      )}
      <table
        {...getTableProps()}
        className="table-home min-w-full"
        cellPadding="16"
        cellSpacing={0}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`${
                    headerClass ? headerClass : "bg-box-bg"
                  } whitespace-nowrap  sm:text-base text-sm`}
                >
                  {column.render("Header")}

                  {!column.disableSortBy && (
                    <span>
                      {column.isSortedDesc ? (
                        <img
                          className="icon-sort icon-sort-up"
                          src={iconSortDown}
                          alt=""
                        />
                      ) : (
                        <img className="icon-sort" src={iconSortDown} alt="" />
                      )}
                    </span>
                  )}
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
                      <NavLink to={`/project/${row.original._id}`}>
                        {cell.render("Cell")}
                      </NavLink>
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      {!isEmpty && (
        <TablePagination
          previousPage={previousPage}
          canPreviousPage={canPreviousPage}
          nextPage={nextPage}
          canNextPage={canNextPage}
          pageOptions={pageOptions}
          pageIndex={pageIndex}
          gotoPage={gotoPage}
        />
      )}
    </div>
  )
}

ReactTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  onPaginationChange: PropTypes.func.isRequired,
  headerClass: PropTypes.string,
  loading: PropTypes.bool
}

export default ReactTable
