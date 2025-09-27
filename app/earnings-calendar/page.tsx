"use client"

import React, { useEffect, useState } from "react";
import { today, getLocalTimeZone, startOfWeek, startOfMonth, endOfWeek, endOfMonth, CalendarDate, Calendar } from "@internationalized/date";
import { RangeCalendar } from "@heroui/calendar";
import { Button, ButtonGroup } from "@heroui/button";
import { useLocale } from "@react-aria/i18n";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Chip } from "@heroui/chip";
import { getEarningsCalendarData } from "../services/data-service";
import { Spinner } from "@heroui/spinner";
import { ArrowUpCircleIcon } from "@/components/icons";

export default function EarningsCalendarPage() {
  let now = today(getLocalTimeZone());
  let {locale} = useLocale();

  let [value, setValue] = React.useState({
    start: now,
    end: endOfWeek(now.add({weeks: 1}), locale),
  });
  
  let [focusedValue, setFocusedValue] = React.useState(today(getLocalTimeZone()));

  let nextMonth = now.add({months: 1});

  let todaysDate = {
    start: today(getLocalTimeZone()),
    end: today(getLocalTimeZone()),
  };

  let nextWeek = {
    start: startOfWeek(now.add({weeks: 1}), locale),
    end: endOfWeek(now.add({weeks: 1}), locale),
  };

  let nextMonthValue = {start: startOfMonth(nextMonth), end: endOfMonth(nextMonth)};

  return (
    <section>
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
      <h1 className="flex justify-start mt-5 mb-5 text-2xl font-bold">Earnings Calendar</h1>
      <div className="grid grid-cols-2 sm:flex basis-1/5 sm:basis-full justify-center">
        <div className="h-auto">
          <RangeCalendar
            minValue={today(getLocalTimeZone())} maxValue={today(getLocalTimeZone()).add({ months: 2 })}
            classNames={{
              content: "w-full",
              cellButton: "cursor-pointer"
            }}
            focusedValue={focusedValue}
            nextButtonProps={{
              variant: "bordered",
            }}
            prevButtonProps={{
              variant: "bordered",
            }}
            topContent={<ButtonGroup
              fullWidth
              className="px-3 max-w-full pb-2 pt-3 bg-content1 [&>button]:text-default-500 [&>button]:border-default-200/60"
              radius="full"
              size="sm"
              variant="bordered"
            >
            <Button
              onPress={() => {
                setValue(todaysDate);
                setFocusedValue(todaysDate.end);
              } }
            >
              Today
            </Button>
            <Button
              onPress={() => {
                setValue(nextWeek);
                setFocusedValue(nextWeek.end);
              } }
            >
              Next week
            </Button>
            <Button
              onPress={() => {
                setValue(nextMonthValue),
                setFocusedValue(nextMonthValue.start);
              } }
            >
              Next month
            </Button>
          </ButtonGroup>}
          value={value}
          onChange={setValue}
          onFocusChange={setFocusedValue} />
        </div>
        <div className="ml-10 w-250">
          <EarningsAccordion startDate={value.start} endDate={value.end}/>
        </div>
      </div>
    </section>
  );
}

export function EarningsAccordion({startDate, endDate}: {startDate: CalendarDate, endDate: CalendarDate}) {
  const [earningsCalendar, setEarningsCalendar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const earningsCalendarData = await getEarningsCalendarData(startDate.toString(), endDate.toString());
    if (earningsCalendarData === "error") {
      setLoading(false);
      setError(true);
      return;
    }
    setEarningsCalendar(earningsCalendarData);
  }

  useEffect(() => {
      setLoading(true);
      fetchData();
      setLoading(false);
  }, [endDate]);

  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString + " 00:00:00");
    return date.toDateString();
  }

  return (
    <section>
      {error ? (
        <div>Error loading data</div>
      ) : (
        <>
          {loading === true ? (
              <Spinner label="Loading earnings calendar data" className="flex"></Spinner>
            ) : (
            <Accordion selectionMode="multiple" defaultExpandedKeys={["0"]}>
              {earningsCalendar.map((item: any, index: number) => (
                <AccordionItem key={index} aria-label="earningsDate" title={formatDate(item.date)}
                  classNames={{trigger: "cursor-pointer"}}>
                  <div className="mb-4">
                    {(item.symbols?.length !== 0) ? (
                      <div>
                        {item.symbols.map(((stock: any, index: number) => (
                          <Chip
                            key={index}
                            variant="flat"
                            size="lg"
                            className="mr-2 mb-2"
                          >
                            {stock}
                          </Chip>
                        )))}
                      </div>
                    ):(
                      <div>No earnings releases for this day</div>
                    )}
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </>
      )}
    </section>
  )
}
