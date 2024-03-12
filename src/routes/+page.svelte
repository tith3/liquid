<script lang=ts>
	import {Pane, Splitpanes} from "svelte-splitpanes"
	import '$lib/css/splitpaneTheme.postcss'
</script>

<Splitpanes theme="skeleton" class="p-4" horizontal={true}>
	<Pane minSize={10}> One </Pane>
	<Pane minSize={10}> Two </Pane>
</Splitpanes>


