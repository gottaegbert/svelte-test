<script>
    import { scaleOrdinal } from 'd3-scale';
    import { LayerCake, Svg } from "layercake";
   import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
    import data from "../../data/dunhuangupdating.csv";
	import CircleBurst from '../Circleburst.svelte';

  // let groupBy = 'false';
  // let groupByy = 'false';
	import ButtonSet from "$components/helpers/ButtonSet.svelte";
	const options = [
		{ value: "First Tang" },
		{ value: "Flourishing Tang" },
		{ value: "Middle Tang" },
		{ value: "Late Tang" }
    
	];
  let selectedPeriod = "Middle Tang";
  function handlePeriodChange(event) {
    selectedPeriod = event.detail.value;
     filteredData = data.filter(filterData);
  }
  function filterData(d) {
    return d.period === selectedPeriod;
  }

  $: filteredData = data.filter(filterData);

</script>





<section id="demo-buttonset">
  <h2>Main Circle of Dunhuang</h2>
	<h2>Button Set <span>{selectedPeriod}</span></h2>
	<ButtonSet legend={"Choose"} {options} bind:value={selectedPeriod} on:change={handlePeriodChange}  />


	<figure>
	<LayerCake debug={true} data={data} padding={{ top: 1, right: 2, bottom: 2, left: 2 }} >
    <Svg >
    <rect x={0} y={0} width="100%" height="100%" fill="green"/>
      <CircleBurst  data={filteredData} recwidth={50} recindex={30}/>

    </Svg>
  </LayerCake>
	</figure>
</section>


<style>
	figure {
		margin: 1rem auto;
		width: 100%;
		height: 100vh;
	}
</style>
