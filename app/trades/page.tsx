"use client"

import DataContext from "../data/data-context";

import React, {useEffect, useState, useContext, useRef} from "react";
import { ArrowDownIcon, ArrowUpCircleIcon, ArrowUpIcon, GroupIcon } from "@/components/icons";
import { Spinner} from "@heroui/spinner";
import { Card, CardHeader, CardBody} from "@heroui/card";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Tab, Tabs } from "@heroui/tabs";
import { Pagination } from "@heroui/pagination";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import { getTrades } from "../services/data-service";
import { Trade } from "../models/api-models";

export default function TradesPage() {
  const { data } = useContext(DataContext);
  const [squadData, setSquadData] = useState({});
  const [error, setError] = useState(false);
  const [trades, setTrades] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      setLoading(true);
      const dataFromContext = data;
      const dataFromLocalContext = localStorage.getItem("context");
      if (dataFromContext !== "all") {
        setSquadData(dataFromContext);
        localStorage.setItem("context", dataFromContext);
      } else {
        if (dataFromLocalContext !== null) {
          setSquadData(dataFromLocalContext);
        } else {
          setSquadData(dataFromContext);
        }
      }
      
      const fetchData = async () => {
        const tradesDataMap = new Map();

        const tradesData = await getTrades("1", "");
        if (tradesData === "error") {
          setLoading(false);
          setError(true);
          return;
        }

        tradesDataMap.set("1", tradesData);
        setTrades(tradesDataMap);
        setLoading(false);
      }
      fetchData();
      effectRan.current = true;
    }
  }, []);

  let tabs = [
    {
      id: "all",
      label: "All"
    },
    {
      id: "oneWeekOrLess",
      label: "1 week or less"
    },
    {
      id: "oneWeekToOneMonth",
      label: "1 week to 1 month"
    },
    {
      id: "oneToThreeMonths",
      label: "1 to 3 months"
    },
    {
      id: "threeToSixMonths",
      label: "3 to 6 months"
    },
    {
      id: "sixToTwelveMonths",
      label: "6 to 12 months"
    },
    {
      id: "moreThanOneYear",
      label: "More than 1 year"
    }
  ];

  return (
    <section>
      {error ? (
        <div>Error loading data</div>
      ) : (
        <>
          <div className="gap-4 grid grid-cols-2 sm:flex basis-1/5 sm:basis-full justify-center">
            <Chip
              variant="flat"
              color="success"
              size="lg"
              endContent={<ArrowUpCircleIcon />}
            >
              S&P 500: 6500 (+.1%)
            </Chip>

            <Chip
              variant="flat"
              color="success"
              size="lg"
              endContent={<ArrowUpCircleIcon />}
            >
                <p>Nasdaq: 21000 (+.5%)</p>
            </Chip>

            <Chip
              variant="flat"
              color="success"
              size="lg"
              endContent={<ArrowUpCircleIcon />}
            >
                <p>Dow Jones: 45000 (+.3%)</p>
            </Chip>
          </div>
          <div className="flex flex-col justify-center py-8 md:py-5">
            <Chip
                size="lg"
                classNames={{
                  base: "bg-linear-to-tr from-gray-500 to-sky-500 border-small border-transparent/50 shadow-sky-500/25 mb-5",
                  content: "drop-shadow-xs shadow-black text-white",
                }}
                variant="shadow"
              >
                Trades
              </Chip>
              {loading === true ? (
                <Spinner label="Loading trades"></Spinner>
              ) : (
                <Tabs aria-label="Dynamic tabs" items={tabs}>
                    {(item) => (
                      <Tab key={item.id} title={item.label}>
                        <Card>
                          <CardHeader className="flex gap-3">
                            <GroupIcon />
                            <div className="flex flex-col">
                              <p className="text-md font-bold">{"Turf and Turf"}</p>
                            </div>
                          </CardHeader>
                          <Divider />
                          <CardBody>
                            <TradesTable squadId={"1"} trades={trades}/>
                          </CardBody>
                        </Card>
                      </Tab>
                    )}
                  </Tabs>
                )}
          </div>
        </>
      )}
    </section>
  );
}

const columns = [
  {
    name: "Symbol",
    uid: "tickerSymbol",
  },
  {
    name: "Trade Date",
    uid: "tradeDate",
  },
  {
    name: "Trade Status",
    uid: "status",
  },
  {
    name: "Initial Price",
    uid: "initialPrice",
  },
  {
    name: "Projected Price",
    uid: "projectedPrice",
  },
  {
    name: "Direction",
    uid: "direction",
  },
  {
    name: "Created By",
    uid: "createdBy",
  },
  {
    name: "Notes",
    uid: "notes",
  }
];

export function TradesTable({squadId, trades}: {squadId: string, trades: Map<string, Trade[]>}) {
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;
  let pages: number;

  const tradesLength = trades.get("1")?.length
  if (tradesLength !== undefined) {
    pages = Math.ceil(tradesLength/rowsPerPage);
  } else {
    pages = 1;
  }

  const paginatedTrades = React.useMemo(() => {
    const start = (page-1) * rowsPerPage;
    const end = start + rowsPerPage;
    return trades.get("1")?.slice(start, end);
  }, [page, trades.get("1")]);

  const renderCell = React.useCallback((trade: any, columnKey: any) => {
    const cellValue = trade[columnKey];
    const displayStatusColor = (trade.status === "active") ? "success" : "default";
    const displayArrow = (trade.direction === "up") ? <ArrowUpIcon color="green"/> : <ArrowDownIcon  color="red"/>;

    switch (columnKey) {
      case "tickerSymbol":
        return (
          <div className="flex flex-col">{trade.tickerSymbol}</div>
        );
      case "tradeDate":
        return (
          <div className="flex flex-col">{trade.tradeDate}</div>
        );
      case "status":
        return (
          <Chip className="capitalize" color={displayStatusColor} size="sm" variant="flat">
            {trade.status}
          </Chip>
        );
      case "initialPrice":
        return (
          <div className="flex flex-col">{trade.initialPrice}</div>
        );
      case "projectedPrice":
        return (
          <div className="flex flex-col">{trade.projectedPrice}</div>
        );
      case "direction":
        return (
          <div className="flex flex-col">{displayArrow}</div>
        );
      case "createdBy":
        return (
          <div className="flex flex-col">{trade.createdBy}</div>
        );
      case "notes":
        return (
          <div className="flex flex-col">{trade.notes}</div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <Table aria-label="Trades table"
      bottomContent={
      <div className="flex w-full justify-center">
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
          classNames={{item: "cursor-pointer", prev: "cursor-pointer", next: "cursor-pointer"}}/>
      </div>}>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={paginatedTrades}>
        {(item) => (
          <TableRow key={item.tradeId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
