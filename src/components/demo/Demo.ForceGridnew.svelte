<script>
  import { LayerCake, Svg } from 'layercake';
  import { onMount } from 'svelte';
  import { select, forceSimulation, forceCenter, forceCollide, drag } from 'd3';
  import ForceGridnew from '../ForceGridnew.svelte';
  import data from '../../data/dunhuangupdating.csv';
  
  
    
</script>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }

</style>

<div class="chart-container">
  <LayerCake
    padding={{top: 10, right: 10, bottom: 10, left: 10}}
  data={data}
  >
  <Svg>
    <ForceGridnew />
    </Svg>
  </LayerCake>
</div>

