<script lang=ts>
	import {Pane, Splitpanes} from "svelte-splitpanes"
	import '$lib/css/splitpaneTheme.postcss'
	import PaneContents from '$lib/components/PaneContents.svelte'
	import {panes, addPane, paneDimensions, resizing, resetKey} from '$lib/stores/panes'
	import {onMount} from 'svelte'
	import { derived, get } from 'svelte/store'
	let rowArr = [0]
	//there must always be one pane
	onMount(() => {
		if(get(panes).length === 0) addPane()
	})
		
	$: paneCols = derived(panes, $panes => {
		let cols: any[] = [];
		let colCount = Math.ceil($panes.length / $paneDimensions.rows);
		for (let i = 0; i < colCount; i++) {
			cols.push($panes.slice(i * $paneDimensions.rows, (i + 1) * $paneDimensions.rows));
		}
		return cols;
	});

	$: paneRows = derived(panes, $panes => {
		let rows = [];
		let rowCount = Math.ceil($panes.length / $paneDimensions.cols);
		for (let i = 0; i < rowCount; i++) {
			rows.push($panes.slice(i * $paneDimensions.cols, (i + 1) * $paneDimensions.cols));
		}
		return rows;
	});
	
	function handleMessage(event: any) {
		if (event.type === 'resized'){
			resizing.set(false);
			return;
		}
		resizing.set(true);
	}

</script>

{#if $paneDimensions.vertical}
	<Splitpanes id={$resetKey.toString()}
		theme="" 
		class=" overflow-hidden p-4" 
		horizontal={false}
		on:resize={handleMessage}
		on:resized={handleMessage}
		on:pane-maximize={handleMessage}>
		{#each $paneCols as colPanes, i}
			<Pane class="min-h-7 min-w-14">
				<Splitpanes 
					theme="" 
					class="" 
					horizontal={true}
					on:resize={handleMessage}
					on:resized={handleMessage}
					on:pane-maximize={handleMessage}>
					{#each colPanes as pane, j}
						<Pane class="min-h-7 min-w-14">
							<PaneContents paneData={pane}/>
						</Pane>
					{/each}
				</Splitpanes>
			</Pane>
		{/each}
	</Splitpanes>
{:else}
	<Splitpanes 
		theme="" 
		class="overflow-hidden p-4" 
		horizontal={true}
		on:resize={handleMessage}
		on:resized={handleMessage}
		on:pane-maximize={handleMessage}>
		{#each $paneRows as rowPanes, i}
			<Pane class="min-h-7 min-w-14">
				<Splitpanes 
					theme="" 
					class="" 
					horizontal={false}
					on:resize={handleMessage}
					on:resized={handleMessage}
					on:pane-maximize={handleMessage}>
					{#each rowPanes as pane, j}
						<Pane  class="min-h-7 min-w-14">
							<PaneContents paneData={pane}/>
						</Pane>
					{/each}
				</Splitpanes>
			</Pane>
		{/each}
	</Splitpanes>
{/if}



