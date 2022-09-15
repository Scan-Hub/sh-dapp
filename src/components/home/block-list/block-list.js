import React, { useCallback, useEffect, useMemo, useRef, useState } from "react"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import useWebSocket from "react-use-websocket"
import get from "lodash/get"
import iconBookmark from "../../../assets/images/block-list/ic_bookmark.svg"
import iconVerified from "../../../assets/images/block-list/verified.svg"
import {
  selectListForm,
  save,
  selectListFormTypes
} from "../../../reducers/metadata.reducer"

import { fetchFormList, fetchFormTypes } from "../../../actions"
import { fCurrency, fNumber } from "../../../utils/formatNumber"

// import iconProject from "../../../assets/images/block-list/icon-chain.png"
// import iconBSC from "../../../assets/images/block-list/ic_bsc.png"
// import iconUp from "../../../assets/images/card/arrow-up.svg"
// import iconDown from "../../../assets/images/card/arrow-down.svg"

import { NewTable } from "../table"
import Filters from "./filters"

import "./block-list.scss"

const REACT_APP_WSS_FEED_URL = process.env.REACT_APP_WSS_FEED_URL

const ProjectNameCell = ({ data }) => {
  return (
    <div className="project-name-cell">
      <div className="w-[40px] h-[40px] rounded-full overflow-hidden mr-4">
        <img
          src={data.project_logo}
          alt={data.project_name}
          className="!h-auto"
        />
      </div>
      <div className="">
        {data.kyc && (
          <img src={iconVerified} alt="ic_verified" className="h-[20px] mb-2" />
        )}
        <p>{data.project_name}</p>
      </div>
    </div>
  )
}

const ChainCell = ({ data }) => {
  if (!data) return "-"

  return (
    <div className="chain-cell">
      <div className="w-6 h-6 mr-2">
        <img
          className="w-full object-contain"
          src={data.logo}
          alt={data.name}
        />
      </div>
      <p>{data.name}</p>
    </div>
  )
}

const RatingCell = ({ value }) => {
  let color = "high"

  if (value < 3) {
    color = "lowest"
  }

  if (value >= 3 && value < 5) {
    color = "low"
  }

  if (value >= 5 && value < 8) {
    color = "medium"
  }

  return (
    <div
      className={clsx("rating-cell", {
        [color]: color
      })}
    >
      {color}
    </div>
  )
}

const FavoriteCell = ({ data }) => {
  // if (!data) return null
  return (
    <div className="w-[20px]">
      <img className="w-full" src={iconBookmark} alt="ic_star" />
    </div>
  )
}

const BlockList = () => {
  const dispatch = useDispatch()
  const mountRef = useRef(null)

  const listForm = useSelector(selectListForm)
  const listFormTypes = useSelector(selectListFormTypes)

  const [filters, setFilters] = useState({
    page: 1,
    page_size: 10
  })

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    REACT_APP_WSS_FEED_URL
  )

  const chainOptions = useMemo(() => {
    return listFormTypes.items.filter((r) => r.type === "chain")
  }, [listFormTypes])

  const tableRecords = useMemo(() => {
    return {
      items: [...listForm.items],
      totalPages: listForm.num_of_page || 0
    }
  }, [listForm])

  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, i) => i + 1,
        disableSortBy: true
      },
      {
        Header: "Project name",
        accessor: "project_name",
        disableSortBy: true,
        Cell: ({ row }) => {
          return <ProjectNameCell data={row.original} />
        }
      },
      {
        Header: "Chain",
        accessor: "smart_contracts",
        disableSortBy: true,
        Cell: ({ value }) => {
          if (!value || (value && !value.length)) return "-"
          const chain = chainOptions.find((c) => c._id === value[0].chain)

          return <ChainCell data={chain} />
        }
      },
      {
        Header: "Price",
        accessor: "p",
        Cell: ({ value, row }) => {
          let price = value
          const latest_price_report = get(
            row.original,
            "latest_price_report",
            []
          )
          if (!value && !latest_price_report.length) return "-"
          if (!value && latest_price_report.length) {
            price = get(latest_price_report, "0.data.0.price", 0)
          }

          return (
            <div className="whitespace-nowrap min-w-[80px]">
              {fCurrency(price)}
            </div>
          )
        }
      },
      {
        Header: "Market Cap",
        accessor: "mc",
        Cell: ({ value, row }) => {
          let marketCap = value
          const latest_price_report = get(
            row.original,
            "latest_price_report",
            []
          )
          if (!value && !latest_price_report.length) return "-"
          if (!value && latest_price_report.length) {
            marketCap = get(latest_price_report, "0.data.0.market_cap", 0)
          }
          return (
            <div className="whitespace-nowrap min-w-[120px]">
              {fCurrency(parseInt(marketCap))}
            </div>
          )
        }
      },
      {
        Header: "Holder",
        accessor: "holders",
        Cell: ({ value }) => fNumber(get(value, "0.holders", 0))
      },
      {
        Header: "Votes",
        accessor: "total_vote",
        Cell: ({ value }) => fNumber(value)
      },
      {
        Header: "Rating",
        accessor: "point",
        disableSortBy: true,
        Cell: ({ value }) => <RatingCell value={value} />
      },
      {
        Header: "",
        accessor: "favorite1",
        disableSortBy: true,
        Cell: ({ value }) => <FavoriteCell data={value} />
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chainOptions]
  )

  const handleUpdateRealtimePrice = () => {
    let items = [...listForm.items]

    if (lastJsonMessage && items.length && !listForm.loading) {
      let projectPricing = lastJsonMessage.d.cr

      items = [...listForm.items].map((r) => {
        if (r.cmc_project_id && r.cmc_project_id === projectPricing.id) {
          return {
            ...r,
            ...projectPricing
          }
        }
        return r
      })

      dispatch(
        save({
          key: "listForm",
          value: {
            loading: false,
            items,
            num_of_page: listForm.num_of_page
          }
        })
      )
    }
  }

  const handleGetRealtimePrice = useCallback(() => {
    if (tableRecords.items.length && !mountRef.current) {
      const cryptoIds = tableRecords.items
        .filter((r) => r.cmc_project_id)
        .map((r) => r.cmc_project_id)

      sendJsonMessage({
        method: "subscribe",
        id: "price",
        data: { cryptoIds, index: "detail" }
      })

      mountRef.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableRecords])

  const handleFetchListForm = useCallback(() => {
    dispatch(fetchFormList(filters))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const handlePaginationChange = useCallback((pagination) => {
    setFilters({
      page_size: pagination.pageSize,
      page: pagination.page
    })
  }, [])

  useEffect(() => {
    dispatch(fetchFormTypes())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    handleFetchListForm()
  }, [handleFetchListForm])

  useEffect(() => {
    handleUpdateRealtimePrice()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastJsonMessage])

  useEffect(() => {
    handleGetRealtimePrice()
  }, [handleGetRealtimePrice])

  return (
    <div className="flex flex-row gap-x-8 block-list py-16">
      <div className="hidden md:block">
        <Filters />
      </div>
      <div className="block-list__table overflow-x-auto cus_scrollbar pb-2 grow">
        <NewTable
          loading={listForm.loading}
          columns={columns}
          data={tableRecords.items}
          pagination={{
            page: filters.page,
            pageSize: filters.page_size,
            totalPages: tableRecords.totalPages
          }}
          onPaginationChange={handlePaginationChange}
        />
      </div>
    </div>
  )
}

export default BlockList
