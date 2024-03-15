import {localStorageStore} from '@skeletonlabs/skeleton'
import { type Writable, get } from 'svelte/store'
import type {TimeSeriesDSDataPoint, TimeSeriesRawDSDataPoint } from '$lib/types'

export const dsDataSet: Writable<TimeSeriesRawDSDataPoint[]> = localStorageStore('dsdata', [] as TimeSeriesRawDSDataPoint[])

export function addDSDataPoint(data: TimeSeriesRawDSDataPoint) {
    dsDataSet.update((dsDataSet) => {
        return [...dsDataSet, data]
    })
}

export function resetDSDataSet() {
    dsDataSet.set([])
}

export function getStoredDSDataTokenAddress(): string {
    //check if there is any data in the store
    if (get(dsDataSet).length === 0) {
        return ''
    }
    //return the token address of the first data point
    return get(dsDataSet)[0].data.baseToken.address
}