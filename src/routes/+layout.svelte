<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	import { AppShell } from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar padding='p-3'>
			<svelte:fragment slot="lead">
				<Icon width='12' height='12'/>
				<p class='text-xl uppercase p-4'> liquid </p>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot/>
</AppShell>

