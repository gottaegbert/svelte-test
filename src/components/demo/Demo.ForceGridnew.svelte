<script>
  import { LayerCake, Svg } from 'layercake';
  import ForceGridnew from '../ForceGridnew.svelte';
  import data from '../../data/dunhuangupdating.csv';
  import Scrolly from "$components/helpers/Scrolly.svelte";
  
  let value;
    
</script>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }

	.step {
		height: 40vh;
		background: var(--color-gray-100);
		text-align: center;
	}

	.step p {
		padding: 1rem;
	}

	h2 {
		position: sticky;
		top: 4em;
	}


</style>

<section id="scrolly">
  	<h2>Scrolly <span>{value}</span></h2>
    <Scrolly bind:value>
		{#each [0] as text, i}
			{@const active = value === i}
			<div class="step" class:active>
				<p>{text}</p>
        <div class="chart-container" >
  <LayerCake
    padding={{top: 10, right: 10, bottom: 10, left: 10}}
  data={data}
  >
  <Svg>
    <ForceGridnew />
    </Svg>
  </LayerCake>
</div>
			</div>
		{/each}
	</Scrolly>

</section>

