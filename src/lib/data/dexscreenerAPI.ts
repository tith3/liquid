import { addDSDataPoint, getStoredDSDataTokenAddress, resetDSDataSet } from "$lib/stores/dsdata";
import type { DSDataPoints, TimeSeriesRawDSDataPoint } from "$lib/types";

let interval_id: ReturnType<typeof setInterval>;
//dexscreener API endpoint
const endpoint = 'https://api.dexscreener.com/latest/dex/tokens/';

async function getRawTokenDataPoint(token_address: string): Promise<DSDataPoints> {
    const raw_data = await fetch(endpoint + token_address)
    //serialize the data
    const data_point = await raw_data.json()
    return data_point
}


async function getTimeSeriesRawTokenDataPoint(token_address: string): Promise<TimeSeriesRawDSDataPoint> {
    const time = Date.now()
    const data_point: DSDataPoints = await getRawTokenDataPoint(token_address)
    const time_series_data_point: TimeSeriesRawDSDataPoint = {
        time: time,
        data: data_point.pairs[0]
    }
    return time_series_data_point
}

export function startPollingDSData(token_address: string, interval: number): void {
    //stop any previous polling
    stopPollingDSData();
    //check if there is any exisiting data in the store and if the token address is different
    if (getStoredDSDataTokenAddress() !== token_address) {
        //reset the data store
        resetDSDataSet()
    }
    //check if token address is empty
    if (token_address === '') {
        return;
    }
    interval_id = setInterval(async () => {
        const time_series_data_point = await getTimeSeriesRawTokenDataPoint(token_address)
        addDSDataPoint(time_series_data_point)
    }, interval)
}

export function stopPollingDSData(): void {
    clearInterval(interval_id)
}
