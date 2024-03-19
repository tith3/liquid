<script lang='ts'>
    import { Line } from 'svelte-chartjs'
    import {AppShell, AppBar, type PopupSettings, ListBox, ListBoxItem, popup} from '@skeletonlabs/skeleton';  
    import {removePane, toggleHeaderExpanded, setDataPointName} from '$lib/stores/panes';  
    import { X, CaretDoubleRight } from 'phosphor-svelte';
    import { type PaneData, DSDataPointNames } from '$lib/types';
    import { dsDataSet } from '$lib/stores/dsdata';
    import {getDataPointByName} from '$lib/utils/dsdata';
    export let paneData: PaneData;
    $: ({dataPointName, index, headerExpanded} = paneData);
    
    // Graph
    let data = {
        labels: [] as string[],
        datasets: [
            {
                label: dataPointName,
                data: [] as number[],
                lineTension: 0.1,
            }
        ]
    };

    $: {
        //text = `Pane ${index}`;
        data.labels = $dsDataSet.map((d) => new Date(d.time).toLocaleDateString());
        console.log(dataPointName);
        //get corresponding data points
        data.datasets[0].data = $dsDataSet.map((d) => getDataPointByName(dataPointName, d));
        //get corresponding label
        data.datasets[0].label = dataPointName;
    }

    
    /// Header Controls
    //combobox
    let PDCId = 'popupDataCombobox' + index;
    let popupDataCombobox: PopupSettings = {
        event: 'click',
        target: PDCId,
        placement: 'bottom',
        closeQuery: '.listbox-item',
    }
    $: {
        //check if index is undefined
        if(index !== undefined){
            PDCId = 'popupDataCombobox' + index;
            popupDataCombobox = {
                event: 'click',
                target: PDCId,
                placement: 'bottom',
                closeQuery: '.listbox-item',
            }
        }
    }

    let dataCombobox = DSDataPointNames.LIQUIDITY_QUOTE;
    $: {
        console.log("Changing data point name " + dataCombobox);
        //check if datacomboboc is not undegined
        if(dataCombobox !== undefined){
            setDataPointName(index, dataCombobox);
        }
    }
</script>

<!-- Popups -->
<div class="card variant-filled text-xs p-1 z-50" data-popup={PDCId}>
    <ListBox>
        {#each Object.values(DSDataPointNames) as item}
            <ListBoxItem bind:group={dataCombobox} name="medium" value={item} class="listbox-item">{item}</ListBoxItem>
        {/each}
    </ListBox>
</div>
<!-- /Popups -->

<AppShell class="variant-glass-surface rounded-lg" slotHeader="z-11 {headerExpanded ? '' : 'absolute'} w-full" slotPageContent="size-full overflow-hidden z-11" >
    <svelte:fragment slot="header">
        <AppBar slotDefault="w-full" padding='h-7 {headerExpanded ? 'w-full' : 'w-7'}' background='variant-ghost-surface rounded-t-lg {headerExpanded ? 'rounded-t-lg' : 'rounded-lg'}'>
            <svelte:fragment slot="lead">
                <button type= 'button' class='btn h-7 w-7 p-0 hover:variant-glass-surface {headerExpanded ? '' : 'rounded-lg'}' on:click={() => {toggleHeaderExpanded(index)}}>
                    <CaretDoubleRight class='fill-token {headerExpanded ? 'rotate-180' : 'rotate-0'}'/>
                </button>
            </svelte:fragment>
                {#if headerExpanded}
                    <button class="btn variant-filled justify-between h-5 text-xs" use:popup={popupDataCombobox}>
                        <span>{dataPointName}</span>
                        <span>↓</span>
                    </button>
                {/if}
            <svelte:fragment slot="trail">
                <button type= 'button' class='btn h-7 w-7 p-0 top-0 right-0 absolute hover:variant-glass-surface ' on:click={() => {removePane(index)}}>
                    <X class='fill-token'/>
                </button>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <Line {data} class="size-full" options ={{
        responsive: true,
        maintainAspectRatio: false,
    }}/>
</AppShell>
