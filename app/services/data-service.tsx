export async function getSquads(userId: string) {
    let squadsUrl = "";

    try {
        const getSquadsResponse = await fetch(squadsUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!getSquadsResponse.ok) {
            return "error";
        }

        const squads = await getSquadsResponse.json();
        return squads;
    } catch (error) {
        return "error"
    }
}

export async function getTrades(squadId: string, requestType: string) {
    let tradesUrl = "";
    if (requestType !== "") {
        tradesUrl += "&requestType="+requestType
    }

    try {
        const tradesResponse = await fetch(tradesUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!tradesResponse.ok) {
            return "error";
        }

        const trades = await tradesResponse.json();
        return trades;
    } catch (error) {
        return "error"
    }
}

export async function getEarningsCalendarData(startDate: string, endDate: string) {
    let earningsCalendarUrl = "";

    try {
        const earningsCalendarResponse = await fetch(earningsCalendarUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!earningsCalendarResponse.ok) {
            return "error";
        }

        const earningsCalendarData = await earningsCalendarResponse.json();
        return earningsCalendarData;
    } catch (error) {
        return "error"
    }
}
