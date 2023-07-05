<script>
	import DemoLink from "$components/demo/Demo.Link.svelte";
	import DemoImg from "$components/demo/Demo.Img.svelte";
	import DemoButtonSet from "$components/demo/Demo.ButtonSet.svelte";
	import DemoRange from "$components/demo/Demo.Range.svelte";
	import DemoSelect from "$components/demo/Demo.Select.svelte";
	import DemoToggle from "$components/demo/Demo.Toggle.svelte";
	import DemoSortTable from "$components/demo/Demo.SortTable.svelte";
	import DemoLayerCake from "$components/demo/Demo.LayerCake.svelte";
	import DemoSvelteElement from "$components/demo/Demo.SvelteElement.svelte";
	import DemoSvelteComponent from "$components/demo/Demo.SvelteComponent.svelte";
	import DemoFigure from "$components/demo/Demo.Figure.svelte";
	import DemoTip from "$components/demo/Demo.Tip.svelte";
	import DemoScrolly from "$components/demo/Demo.Scrolly.svelte";
	import DemoBubble from "$components/demo/Demo.Bubble.svelte";
	import DemoTestbed from "$components/demo/Demo.Testbed.svelte";
	import DemoCubeMatrix from "$components/demo/Demo.CubeMatrix.svelte";
	import DemoForceGrid from "$components/demo/Demo.ForceGrid.svelte";
	import DemoForceGridnew from "$components/demo/Demo.ForceGridnew.svelte";
</script>

<div id="demo">
	<h1>Dunhuang Color</h1>
	<!-- <DemoLink />
	<DemoImg />
	<DemoButtonSet />
	<DemoRange />
	<DemoSelect />
	<DemoToggle />
	<DemoSortTable /> -->
	<DemoForceGridnew />
	<!-- <DemoForceGrid /> -->
	<DemoCubeMatrix />
	<DemoTestbed />
	<DemoBubble />
	<!-- <DemoLayerCake /> -->
<!-- 
	<DemoSvelteElement />
	<DemoSvelteComponent />
	<DemoTip />
	<DemoFigure /> -->
	<!-- <DemoScrolly /> -->
</div>

<style>
	#demo {
		max-width: 100rem;
		padding: 16px;
		margin: 0 auto;
	}

	:global(#demo section) {
		margin: 32px auto;
		padding-top: 32px;
	}

	:global(#demo h2 span) {
		background: var(--color-mark);
		padding: 0 8px;
	}
</style>
