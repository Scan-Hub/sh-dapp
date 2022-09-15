import React, { useState } from "react";
import Table, {
  ChainCell,
  ChangeCell,
  FavoriteCell,
  ProjectNameCell,
  RatingCell,
  Vote24hCell,
} from "../home/table/table";

const TableWatchList = ({ tableBody }) => {
  const data = React.useMemo(
    () => [
      {
        name: {
          icon: "../../assets/img/block-list/icon-chain.png",
          title: "The Web3 Project",
        },
        chain: {
          icon: "../../assets/img/block-list/icon-binance.png",
          name: "BSC",
        },
        cap: "$ 21,362",
        price: "$ 21,362",
        change: {
          status: "up",
          percent: 4.21,
        },
        launch: "5 months",
        votes: "10,100",
        vote24h: {
          status: "up",
          value: "22,365",
        },
        rating: "high",
        favorite: true,
      },
      {
        name: {
          icon: "../../assets/img/block-list/icon-chain.png",
          title: "The Web3 Project",
        },
        chain: {
          icon: "../../assets/img/block-list/icon-binance.png",
          name: "BSC",
        },
        cap: "$ 21,362",
        price: "$ 21,362",
        change: {
          status: "up",
          percent: 4.21,
        },
        launch: "5 months",
        votes: "10,100",
        vote24h: {
          status: "up",
          value: "22,365",
        },
        rating: "medium",
        favorite: true,
      },
      {
        name: {
          icon: "../../assets/img/block-list/icon-chain.png",
          title: "The Web3 Project",
        },
        chain: {
          icon: "../../assets/img/block-list/icon-binance.png",
          name: "BSC",
        },
        cap: "$ 21,362",
        price: "$ 21,362",
        change: {
          status: "up",
          percent: 4.21,
        },
        launch: "5 months",
        votes: "10,100",
        vote24h: {
          status: "up",
          value: "22,365",
        },
        rating: "low",
        favorite: true,
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: (row, i) => i + 1,
        disableSortBy: true,
      },
      {
        Header: "Project name",
        accessor: "name",
        disableSortBy: true,
        Cell: ({ value, row }) => <ProjectNameCell data={value} />,
      },
      {
        Header: "Chain",
        accessor: "chain",
        disableSortBy: true,
        Cell: ({ value, row }) => <ChainCell data={value} />,
      },
      {
        Header: "Market Cap",
        accessor: "cap",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Change 24h",
        accessor: "change",
        Cell: ({ value, row }) => <ChangeCell data={value} />,
      },
      {
        Header: "Launch",
        accessor: "launch",
      },
      {
        Header: "Votes",
        accessor: "votes",
      },
      {
        Header: "Vote 24h",
        accessor: "vote24h",
        Cell: ({ value, row }) => <Vote24hCell data={value} />,
      },
      {
        Header: "Rating",
        accessor: "rating",
        disableSortBy: true,
        Cell: ({ value, row }) => <RatingCell data={value} />,
      },
      {
        Header: "",
        accessor: "favorite",
        disableSortBy: true,
        Cell: ({ value, row }) => <FavoriteCell data={value} />,
      },
    ],
    []
  );

  const [pageSize, setPageSize] = useState(3);
  return (
    <div className="px-8 rounded-2xl mb-28">
      {/* <p className="text-2xl text-white font-montserrat font-bold">Watchlist</p> */}
      <div className="mt-8">
        <Table
          columns={columns}
          data={data}
          pageSizeProps={pageSize}
          styleTitleColumns={"bg-box-bg "}
        />
      </div>
    </div>
  );
};

export default TableWatchList;
