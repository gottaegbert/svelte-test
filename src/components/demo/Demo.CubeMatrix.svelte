<script>
  import { LayerCake, Svg, Html } from 'layercake';
  import { scaleOrdinal } from 'd3-scale';

//   import Key from './_components/Key.html.svelte';
//   import AxisX from './_components/AxisX.svelte';
  import Beeswarm from '../Cube.svelte';

  // This example loads csv data as json using @rollup/plugin-dsv
  import data from '../../data/dunhuangupdating.csv';

  const xKey = 'index';
//   const zKey = 'gender';
  const titleKey = 'name';
  const HEX1 = 'HEX1';

  const r = 5;

  const dataTransformed = data.map(d => {
    return {
      [titleKey]: d[titleKey],
      [xKey]: +d[xKey],
      [HEX1]:d[HEX1]
    }
  })

</script>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 250px;
  }
</style>

<div class='chart-container'>
  <LayerCake
    padding={{bottom: 15}}
    x={xKey}
    data={dataTransformed}
    let:width
  >

    <Svg>
      <!-- <AxisX/> -->
      <Beeswarm
        r={width < 400 ? r / 1.25 : r}
        strokeWidth={1}
        xStrength={0.95}
        yStrength={0.075}
        getTitle={d => d[titleKey]}
      />
    </Svg>
<!-- 
    <Html pointerEvents={false}>
      <Key shape='circle' />
    </Html> -->

  </LayerCake>
</div>
