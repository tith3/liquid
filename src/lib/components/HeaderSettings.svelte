<script lang=ts> 
    import { Accordion, AccordionItem, RangeSlider, type PopupSettings, popup} from '@skeletonlabs/skeleton';
    import { SquaresFour, X } from 'phosphor-svelte';
    import { paneDimensions, shrinkPanes } from '$lib/stores/panes';
    
    const vertToolTip: PopupSettings = {
        event: 'hover',
        target: 'vertToolTip',
        placement: 'top'
    }

    const horiToolTip: PopupSettings = {
        event: 'hover',
        target: 'horiToolTip',
        placement: 'top'
    }

    const rowToolTip: PopupSettings = {
        event: 'hover',
        target: 'rowToolTip',
        placement: 'top'
    }

    const colToolTip: PopupSettings = {
        event: 'hover',
        target: 'colToolTip',
        placement: 'top'
    }

    $: {
        let _ = $paneDimensions.maxRows * $paneDimensions.maxCols
        shrinkPanes()
    }
</script>


<h4 class = "h4"> Settings </h4>
<button id="close-settings" type="button" class="btn-icon absolute top-0 right-0">
    <X size="40%"/>
</button>
<hr  />
<!-- Tooltips -->
<div class="card variant-filled text-xs p-1" data-popup="rowToolTip"> number of rows of panes </div>
<div class="card variant-filled text-xs p-1" data-popup="colToolTip"> number of columns of panes </div>
<div class="card variant-filled text-xs p-1" data-popup="horiToolTip"> prioritize putting panes next to each other </div>
<div class="card variant-filled text-xs p-1" data-popup="vertToolTip"> prioritize putting panes on top of each other </div>
<!-- /Tooltips -->

<Accordion padding="px-2 py-2" regionControl='space-x-1' caretClosed="-rotate-90" caretOpen="rotate-0">
    <AccordionItem open class="mx-0">
        <svelte:fragment slot="lead">
            <SquaresFour size="12%" class="w-6 "/>
        </svelte:fragment>
        <svelte:fragment slot="summary">
            <h5 class="h5"> Panes </h5>
        </svelte:fragment>
        <svelte:fragment slot="content">
            <div class="card variant-soft-surface p-2  justify-normal">
                <div class="flex py-1">
                    <div class="flex-1 px-2">Rows:</div>
                    <div class="flex-1 grow">{$paneDimensions.rows} / {$paneDimensions.maxRows}</div>
                    <div class="flex-2 shrink" use:popup={rowToolTip}>
                        <RangeSlider name="row-slider" bind:value={$paneDimensions.rows} min={1} max={$paneDimensions.maxRows} step={1} ticked/>
                    </div>  
                </div>
                <div class="flex py-1">
                    <div class="flex-1 px-2">Cols:</div>
                    <div class="flex-1 grow">{$paneDimensions.cols} / {$paneDimensions.maxCols}</div>
                    <div class ="flex-2 shrink" use:popup={colToolTip}>
                        <RangeSlider name="row-slider" bind:value={$paneDimensions.cols} min={1} max={$paneDimensions.maxCols} step={1} ticked/>
                    </div>
                </div>
                <div class="flex py-1 px-2">
                    <div class="flex-2 grow">Priority:</div>
                    <label class="flex items-center px-2 space-x-2 flex-1">
                        <input class="radio" type="radio" bind:group={$paneDimensions.vertical} name="radio-direct" value={true} use:popup={vertToolTip} />
                        <p>vert</p>
                    </label>
                    <label class="flex items-center space-x-2 flex-1">
                        <input class="radio" type="radio" bind:group={$paneDimensions.vertical} name="radio-direct" value={false} use:popup={horiToolTip}/>
                        <p>hori</p>
                    </label>
                </div>  
            </div>
        </svelte:fragment>
    </AccordionItem>
</Accordion>