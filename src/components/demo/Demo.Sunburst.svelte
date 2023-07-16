<script>
  import { getContext } from 'svelte';
  import { LayerCake, Svg } from 'layercake';
  import { scaleOrdinal, scaleBand } from 'd3-scale';
  import  SunburstMap  from '../SunBurstmap.svelte';

  import data from '../../data/dunhuangupdating.csv';

  const xKey = 'cat1';
  const rKey = 'num';
  const yKey = 'cat2';


  
</script>

<style>
  .chart-container {
    width: 100%;
    height: 2000px;
  }
  /* label {
    cursor: pointer;
  }
  input {
    margin-right: 7px;
  } */
</style>



<div class="chart-container">
  <LayerCake
    data={data}
    x={xKey}
    r={rKey}
    y={yKey}
    xScale={scaleBand()}
    yScale={scaleBand()}
    rRange={[12, 12]}
    zScale={scaleOrdinal()}
  >
    <Svg>
      <SunburstMap
      />
    </Svg>
  </LayerCake>
</div>
