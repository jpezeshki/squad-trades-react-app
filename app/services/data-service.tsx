export async function getSquads(userId: string) {
    try {
        const getSquadsResponse = await fetch('', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
    let tradesUrl = '';
    if (requestType !== "") {
        tradesUrl += "&requestType="+requestType
    }

    try {
        const tradesResponse = await fetch(tradesUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
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
