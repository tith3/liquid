import {localStorageStore} from '@skeletonlabs/skeleton'
import { type Writable, get } from 'svelte/store'
import type { PaneData} from '../types'

export const panes: Writable<PaneData[]> = localStorageStore('panes', [] as PaneData[])
export const maxPanes = 9;

export function addPane(text: string) {
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

