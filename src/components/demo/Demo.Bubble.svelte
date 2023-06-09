<script>
    import { scaleOrdinal } from 'd3-scale';
    import { schemeCategory10 } from 'd3-scale-chromatic';
    import { LayerCake, Svg } from "layercake";
    import data from "../../data/dunhuangupdating.csv";
    const  recwidth = 50; // 每个小方块的宽度
    const recindex = 30; // 一行30个
</script>

<section>
	<h2>LayerCake Bubble</h2>
	<figure>
	<LayerCake data={data} x="cave" y="HEX3" padding={{ top: 1, right: 2, bottom: 2, left: 2 }} >
    <Svg>
  <rect x={0} y={0} width="100%" height="100%" fill="white"/>
  <g >
    {#each data as d, i}
      <rect  x={(i % recindex) * recwidth}  y={Math.floor(i / recindex) * recwidth}  width={30}  height={30}  fill={d.HEX3}/>
       <!-- <Pentagon  x={(i % recindex) * recwidth}  y={Math.floor(i / recindex) * recwidth}  width={30}  height={30}  fill={d.HEX1}/> -->
      <!-- <text x={(i % recindex) * recwidth+recwidth/2} y={Math.floor(i / recindex) * recwidth+recwidth/2} text-anchor="middle" font-size="10px" fill="black"> {d.cave}</text> -->
    {/each}
  </g>
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
