<script> 
    import { panes, addPane, resetPanes } from '$lib/stores/panes';
    let text = '';
</script>
<div class="flex flex-row gap-4 h-8">
    <input class="input" title="token address" type="text" placeholder="Enter token address" bind:value={text} />
    <button type="button" class="btn variant-filled">Go</button>
    <button type="button" class="btn variant-filled" on:click={() => {addPane(text)}}>Add Pane</button>
    <button type="button" class="btn variant-filled" on:click={() => {resetPanes()}}>Reset Panes</button>
</div>
