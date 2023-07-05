<script>
  import { LayerCake, Svg } from 'layercake';
  import { onMount } from 'svelte';
  import { select, forceSimulation, forceCenter, forceCollide, drag } from 'd3';
  import ForceGrid from '../ForceGrid.svelte';
  import data from '../../data/dunhuangupdating.csv';
  
  
    
</script>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
    .chart-container2 {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>

<div class="chart-container">
  <LayerCake
  
  data={data}
  >
  <Svg>
    <ForceGrid />

    </Svg>
  </LayerCake>
</div>

