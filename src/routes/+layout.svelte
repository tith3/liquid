<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { AppBar, storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	import { initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();
	import { Toast } from '@skeletonlabs/skeleton';

	import { AppShell, LightSwitch} from '@skeletonlabs/skeleton';
	import Icon from '$lib/components/Icon.svelte';
	import HeaderControls from '$lib/components/HeaderControls.svelte';
	
</script>

<Toast />
<AppShell slotHeader='z-11'>
	<svelte:fragment slot="header">
		<AppBar padding='py-0 px-4 '>
			<svelte:fragment slot="lead">
				<Icon width='10' height='10'/>
				<p class='text-xl uppercase p-4'> liquid </p>
			</svelte:fragment>
			<HeaderControls />
			<svelte:fragment slot="trail">
				<LightSwitch/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	
	<slot/>
</AppShell>


