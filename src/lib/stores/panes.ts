import {localStorageStore} from '@skeletonlabs/skeleton'
import { type Writable, get } from 'svelte/store'
import type { PaneData, PaneDimensions } from '../types'
import { Pane } from 'svelte-splitpanes';

export const panes: Writable<PaneData[]> = localStorageStore('panes', [] as PaneData[])


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

export function addPane(text: string) {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols
    if (get(panes).length >= maxPanes) {
        return;
    }
    panes.update((panes) => {
        const index = panes.length
        return [...panes, { index, text }]
    })
}

export function removePane(index: number) {
    //there must always be at least one pane
    if (get(panes).length <= 1) {
        return;
    }
    //remove the pane with the given index
    panes.update((panes) => {
        return panes.filter((pane) => pane.index !== index)
    })
    //update the index of the remaining panes
    //this probably doesn't work how I want it to
    panes.update((panes) => {
        return panes.map((pane, i) => {
            return { ...pane, index: i }
        })
    })
}

export function resetPanes() {
    const newPane = { index: 0, text: '0' }
    panes.set([newPane])
}

export function shrinkPanes() {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols

    //remove panes with highest indices until number of panes is less than or equal to maxPanes
    panes.update((panes) => {
        return panes.slice(0, maxPanes)
    })
}
