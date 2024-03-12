import {localStorageStore} from '@skeletonlabs/skeleton'
import type { Writable } from 'svelte/store'

const panelNumbers: Writable<number> = localStorageStore('panelNumbers', 4)
