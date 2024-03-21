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
	
	//chartjs tree shaking
	import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale } from 'chart.js';
	import autocolors from 'chartjs-plugin-autocolors';
	import CrossHairPlugin from 'chartjs-plugin-crosshair';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	
	ChartJS.register( CrossHairPlugin, Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
	$: {
		console.log($modeCurrent)
		 if($modeCurrent) {
			ChartJS.defaults.color = 'black'
		} else {
			//only works on reload so black for now
			ChartJS.defaults.color = 'black'
		}
	}
</script>
<!-- Necassary to allow toasts -->
<Toast />

<!-- AppShell -->
<AppShell slotHeader='z-11' regionPage="size-full overflow-hidden" slotPageContent= "size-full overflow-hidden">
	<svelte:fragment slot="header">
		<AppBar padding='py-0 px-4' >
			<svelte:fragment slot="lead">
				<div class='size-10'>
					<Icon />
				</div>
				<p class='text-xl uppercase p-4'> liquid </p>
			</svelte:fragment>
				<HeaderControls />
			<svelte:fragment slot="trail">
				<LightSwitch/>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div class='size-full overflow-hidden'>
	 <slot class="overflow-hidden"/>
	</div>
</AppShell>


