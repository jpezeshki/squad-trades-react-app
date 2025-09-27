"use client";

import React, {useEffect, useState, useContext, useRef} from "react";
import { ArrowDownIcon, ArrowRightIcon, ArrowUpCircleIcon, ArrowUpIcon, GroupIcon } from "@/components/icons";
import { getSquads, getTrades } from "./services/data-service";
import { Squad, Trade } from "./models/api-models";
import { Spinner} from "@heroui/spinner";
import { Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from "@heroui/table";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Divider } from "@heroui/divider";
import { Chip } from "@heroui/chip";
import DataContext from "./data/data-context";

export default function HomePage() {
  const [squads, setSquads] = useState([]);
  const [trades, setTrades] = useState(new Map());
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      const fetchData = async () => {
        setLoading(true);
        
        const squadsData = await getSquads('1');
        if (squadsData === "error") {
          setLoading(false);
          setError(true);
          return;
        }
        
        setSquads(squadsData);

        const tradesDataMap = new Map();

        for (const squad of squadsData) {
          const tradesData = await getTrades(squad.squadId, "summary");
          tradesDataMap.set(squad.squadId, tradesData);
        };

        setTrades(tradesDataMap);
        setLoading(false);
      }
      fetchData();
      effectRan.current = true;
    }
  }, []);

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
          <div className="flex flex-col justify-center gap-5 py-8 md:py-5">
            <Chip
              size="lg"
              classNames={{
                base: "bg-linear-to-tr from-gray-500 to-sky-500 border-small border-transparent/50 shadow-sky-500/25",
                content: "drop-shadow-xs shadow-black text-white",
              }}
              variant="shadow"
            >
              Your Squads
            </Chip>
            {loading === true ? (
              <Spinner label="Loading squads"></Spinner>
            ) : (
              <div>
                {squads.length !== 0 ? (
                  <div>
                    {squads.map((squad: Squad, index: number) => (
                      <TradesOverviewCard key={index} squadId={squad.squadId} squadName={squad.squadName}
                      createdBy={squad.createdBy} numberOfMembers={squad.numberOfMembers} trades={trades} />
                    ))}
                  </div>
                ) : (
                  <Card className="max-w-[350px]">
                    <CardBody>
                      <p>You are currently not a part of any squads.</p>
                      <div className="mt-2">
                        <Button className="cursor-pointer mr-2" color="primary">Create a squad</Button>
                        <Button className="cursor-pointer" color="primary">Learn more</Button>
                      </div>
                    </CardBody>
                  </Card>
              )}
              </div>
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
  }
];

export function TradesOverviewTable({squadId, trades}: {squadId: string, trades: Map<string, Trade[]>}) {
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
      default:
        return cellValue;
    }
  }, []);

  if (trades.get(squadId)?.length === 0) {
    return(
      <div>
        It looks like there aren't any trades for this squad.
        <div className="mt-2">
          <Button className="cursor-pointer" color="primary">Create trade</Button>
        </div>
      </div>
    )
  }

  return (
    <Table aria-label="Trades overview table">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={trades.get(squadId)}>
        {(item) => (
          <TableRow key={item.tradeId}>
            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export function TradesOverviewCard({squadId, squadName, createdBy, numberOfMembers, trades}:
  {squadId: string, squadName: string, createdBy: string, numberOfMembers: string, trades: Map<string, Trade[]>}) {
  const { updateData } = useContext(DataContext);

  const updateContextData = () => {
    updateData({squadId: squadId, squadName: squadName});
  }

  return (
    <Card className="mb-5">
      <CardHeader className="flex gap-3">
        <GroupIcon />
        <div className="flex flex-col">
          <p className="text-md font-bold">{squadName}</p>
          <p className="text-small text-default-500">Created by: {createdBy}</p>
        </div>
        <div className="ml-auto text-default-500">{numberOfMembers} members</div>
      </CardHeader>
      <Divider />
      <CardBody>
        <TradesOverviewTable squadId={squadId} trades={trades}/>
      </CardBody>
      {trades.get(squadId)?.length !== 0 ? (
        <><Divider />
        <CardFooter>
          <Link className="cursor-pointer" href="/trades" onClick={updateContextData}>
            View all trades
            <div className="ml-2">
              <ArrowRightIcon />
            </div>
          </Link>
        </CardFooter></>
      ) : <></>}
    </Card>
  );
}
