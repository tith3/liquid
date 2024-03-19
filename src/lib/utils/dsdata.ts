import { DSDataPointNames, type TimeSeriesRawDSDataPoint } from "$lib/types";
import {showErrorToast} from "$lib/utils/error";
//gets only the specific data points from the store
export function getDataPointByName(name: DSDataPointNames, dataPoint: TimeSeriesRawDSDataPoint){
    console.log(name);
    switch (name) {
        case DSDataPointNames.PRICE_NATIVE:
            return +dataPoint.data.priceNative;

        case DSDataPointNames.PRICE_USD:
            return +dataPoint.data.priceUsd;
        //TODO
        // case DSDataPointNames.VOLUME:
        //     // Assuming you want to aggregate volume values here
        //     return Object.values(dataPoint.data.volume).reduce((a, b) => a + b, 0);

        case DSDataPointNames.LIQUIDITY_USD:
            return dataPoint.data.liquidity.usd;

        case DSDataPointNames.LIQUIDITY_BASE:
            return dataPoint.data.liquidity.base;

        case DSDataPointNames.LIQUIDITY_QUOTE:
            return dataPoint.data.liquidity.quote;
        //TODO
        // case DSDataPointNames.PRICE_CHANGE:
        //     // Assuming you want to aggregate price change values here
        //     return Object.values(dataPoint.data.priceChange).reduce((a, b) => a + b, 0);

        default:
            showErrorToast('Sorry, that data point is not available yet. Defaulting to quote liquidity.');
            return getDataPointByName(DSDataPointNames.LIQUIDITY_QUOTE, dataPoint);
    }
}