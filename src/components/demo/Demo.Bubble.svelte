<script>
    import { scaleOrdinal } from 'd3-scale';
    import { LayerCake, Svg } from "layercake";
   import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';
    import data from "../../data/dunhuangupdating.csv";
	import Pentagon from '../Pentagon.svelte';


  //  function trianglePath(x, y, size) {
  //   const angle = (2 * Math.PI) / 5;
  //   const path = `M${x},${y} L${x + size * Math.sin(angle)},${y - size * Math.cos(angle)} L${x + size * Math.sin(2 * angle)},${y} Z`;
  //   return path;
  // }
  
  function trianglePath(x, y, size) {
    const angle = (2 * Math.PI) / 5;
    const halfBase = size * Math.tan(angle / 2);
    const path = `M${x},${y} L${x - halfBase},${y + size} L${x + halfBase},${y + size} Z`;
    return path;
  }


</script>

<section>
	<h2>Color pentagon</h2>
	<figure>
	<LayerCake debug={true} data={data} padding={{ top: 1, right: 2, bottom: 2, left: 2 }} >
    <Svg >
    <rect x={0} y={0} width="100%" height="100%" fill="green"/>
      <Pentagon  {data} recwidth={50} recindex={30}/>
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
