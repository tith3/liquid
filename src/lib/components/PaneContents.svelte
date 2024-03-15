<script lang='ts'>
    import {AppShell, AppBar} from '@skeletonlabs/skeleton';  
    import {removePane, toggleHeaderExpanded} from '$lib/stores/panes';  
    import { X, CaretDoubleRight } from 'phosphor-svelte';
    import type { PaneData } from '$lib/types';
    
    

    export let paneData: PaneData;
    $: ({text, index, headerExpanded} = paneData);
    

</script>

<AppShell class="variant-glass-surface rounded-lg">
    <svelte:fragment slot="header">
        <AppBar padding='h-7 {headerExpanded ? 'w-full' : 'w-7'}' background='variant-ghost-surface rounded-t-lg {headerExpanded ? 'rounded-t-lg' : 'rounded-lg'}'>
            <svelte:fragment slot="lead">
                <button type= 'button' class='btn h-7 w-7 p-0 hover:variant-glass-surface {headerExpanded ? '' : 'rounded-lg'}' on:click={() => {toggleHeaderExpanded(index)}}>
                    <CaretDoubleRight class='fill-token {headerExpanded ? 'rotate-180' : 'rotate-0'}'/>
                </button>
            </svelte:fragment>
                <p class='text h-7'>{text}</p>
            <svelte:fragment slot="trail">
                <button type= 'button' class='btn h-7 w-7 p-0 top-0 right-0 absolute hover:variant-glass-surface ' on:click={() => {removePane(index)}}>
                    <X class='fill-token'/>
                </button>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>