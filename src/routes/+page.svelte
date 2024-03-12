<script lang=ts>
	import {Pane, Splitpanes} from "svelte-splitpanes"
	import '$lib/css/splitpaneTheme.postcss'
	import PaneContents from '$lib/components/PaneContents.svelte'
	import {panes, addPane} from '$lib/stores/panes'
	import {onMount} from 'svelte'
	import { derived, get } from 'svelte/store'
	let rowArr = [0]
	//there must always be one pane
	onMount(() => {
		if(get(panes).length === 0) addPane('0')
	})

	function getPanesForRow(row: number) {
		console.log('row', row);
        return $panes.filter((pane) => {
			console.log('pane', pane.index);
			return Math.ceil((pane.index + 1) / 3) === row + 1;
		}
		)
	}

	$: paneRows = derived(panes, $panes => {
        let rows = [];
        let rowCount = Math.ceil($panes.length / 3);
        for (let i = 0; i < rowCount; i++) {
            rows.push($panes.slice(i * 3, (i + 1) * 3));
        }
        return rows;
    });
		
</script>

<Splitpanes theme="skeleton" class="p-4" horizontal={true}>
	{#each $paneRows as rowPanes, i}
        <Pane minSize={2}>
            <Splitpanes theme="skeleton" horizontal={false}>
                {#each rowPanes as pane, j}
                    <Pane minSize={2}>
                        <PaneContents text={pane.text} index={pane.index}/>
                    </Pane>
                {/each}
            </Splitpanes>
        </Pane>
    {/each}
</Splitpanes>


