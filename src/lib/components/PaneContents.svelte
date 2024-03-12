<script lang='ts'>
    import {AppShell, AppBar} from '@skeletonlabs/skeleton';  
    import {removePane} from '$lib/stores/panes';  

    export let index: number;
    export let text = 'error';
</script>

<AppShell class="bg-primary-200/20">
    <svelte:fragment slot="header">
        <AppBar padding='py-0 px-4 '>
            <svelte:fragment slot="lead">
                <p class='text-xl uppercase p-4'> {text} </p>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <button type='button' class='btn text-xl variant-glass-primary uppercase' on:click={() => {removePane(index)}}> X </button>
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
</AppShell>