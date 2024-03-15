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

export function addPane(text: string,) {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols
    if (get(panes).length >= maxPanes) {
        return;
    }
    panes.update((panes) => {
        const index = panes.length
        return [...panes, { index, text, headerExpanded: true}]
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
    const newPane = { index: 0, text: '0', headerExpanded: true}
    panes.set([newPane])
}

export function toggleHeaderExpanded(index: number) {
    panes.update(panes => panes.map((pane, i) => i === index ? { ...pane, headerExpanded: !pane.headerExpanded } : pane));
}

export function shrinkPanes() {
    const maxPanes = get(paneDimensions).rows * get(paneDimensions).cols

    //remove panes with highest indices until number of panes is less than or equal to maxPanes
    panes.update((panes) => {
        return panes.slice(0, maxPanes)
    })
}
