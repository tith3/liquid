<script lang=ts> 
    import { panes, addPane, resetPanes, paneDimensions} from '$lib/stores/panes';
    import { popup } from '@skeletonlabs/skeleton';
    import type { PopupSettings } from '@skeletonlabs/skeleton';
    import { GearSix } from 'phosphor-svelte';
    import HeaderSettings from '$lib/components/HeaderSettings.svelte';
    let text = '';

    const popupSettings: PopupSettings = {
        event: 'focus-click',
        target: 'popupSettings',
        placement: 'bottom',
        closeQuery: '#close-settings',
    }
</script>
<div class = "card variant-glass-surface p-4 min-h-72 w-72 shadow-2xl fixed z-50" data-popup="popupSettings">
    <HeaderSettings/>
</div>
<div class="flex flex-row gap-4 h-8">
    <input class="input" title="token address" type="text" placeholder="Enter token address" bind:value={text} />
    <button type="button" class="btn variant-filled">Go</button>
    <button type="button" disabled={$panes.length >= ($paneDimensions.rows * $paneDimensions.cols)} class="btn variant-filled" on:click={() => {addPane(text)}}>Add Pane</button>
    <button type="button" class="btn variant-filled" on:click={() => {resetPanes()}}>Reset Panes</button>
    <button type="button" class="btn-icon variant-filled flex" use:popup={popupSettings}>
        <GearSix weight='fill'  size='80%'/>
    </button>
    
</div>
