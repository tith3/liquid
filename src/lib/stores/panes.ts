import {localStorageStore} from '@skeletonlabs/skeleton'
import { type Writable, writable, get } from 'svelte/store'
import { DSDataPointNames, type PaneData, type PaneDimensions } from '../types'

export const panes: Writable<PaneData[]> = localStorageStore('panes', [] as PaneData[])
export const resizing = writable(false); //stores whether a resize is going on
export const resetKey: Writable<number>  = writable(0);
//default pane dimensions
const defaultPaneDimensions: PaneDimensions = {
    rows: 3,
    cols: 3,
    maxRows: 3,
    maxCols: 3,
    vertical: false,
}


//store the dimensions of the panes
export const paneDimensions: Writable<PaneDimensions> = localStorageStore('paneDimensions', defaultPaneDimensions)

export function addPane() {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols
    if (get(panes).length >= maxPanes) {
        return;
    }
    panes.update((panes) => {
        const index = panes.length
        const dataPointName = DSDataPointNames.LIQUIDITY_QUOTE
        return [...panes, { index, dataPointName, headerExpanded: true}]
    })
}

export function removePane(index: number) {
    //there must always be at least one pane
    if (get(panes).length <= 1) {
        return;
    }
    //remove the pane with the given index
    panes.update((panes) => {
        const newPanes = panes.filter((pane) => pane.index !== index);
        return newPanes.map((pane, i) => {
            return { ...pane, index: i, headerExpanded: pane.headerExpanded }
        });
    });
}

export function resetPanes() {
    const newPane = { index: 0, dataPointName: DSDataPointNames.LIQUIDITY_QUOTE, headerExpanded: true}
    panes.set([newPane])
}

export function toggleHeaderExpanded(index: number) {
    panes.update(panes => panes.map((pane, i) => i === index ? { ...pane, headerExpanded: !pane.headerExpanded } : pane));
}

export function setDataPointName(index: number, dataPointName: DSDataPointNames) { 
    panes.update(panes => panes.map((pane, i) => i === index ? { ...pane, dataPointName } : pane));
}

export function shrinkPanes() {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols

    //remove panes with highest indices until number of panes is less than or equal to maxPanes
    panes.update((panes) => {
        return panes.slice(0, maxPanes)
    })
}

export function resetPaneSize() {
    resetKey.update((key) => key + 1)
}
