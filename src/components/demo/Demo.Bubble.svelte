<script>
    import { scaleOrdinal } from 'd3-scale';
    import { LayerCake, Svg } from "layercake";
   import { forceSimulation, forceX, forceY, forceCollide } from 'd3-force';



    import data from "../../data/dunhuangupdating.csv";
    const  recwidth = 50; // 每个小方块的宽度
    const recindex = 30; // 一行30个



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
	<LayerCake data={data} x="cave" y="HEX3" padding={{ top: 1, right: 2, bottom: 2, left: 2 }} >
    <Svg >
  <rect x={0} y={0} width="100%" height="100%" fill="white"/>
  <g >
    {#each data as d, i}
<g transform={`translate(${(i % recindex) * recwidth + recwidth / 2}, ${Math.floor(i / recindex) * recwidth + recwidth / 2})`}>
      <path d={trianglePath(0, 0, 15)} fill={d.HEX1} />
      <path d={trianglePath(0, 0, 15)} fill={d.HEX2} transform="rotate(72)" />
      <path d={trianglePath(0, 0, 15)} fill={d.HEX3} transform="rotate(144)" />
      <path d={trianglePath(0, 0, 15)} fill={d.HEX4} transform="rotate(216)" />
      <path d={trianglePath(0, 0, 15)} fill={d.HEX5} transform="rotate(288)" />
    </g>
      <!-- <rect  x={(i % recindex) * recwidth}  y={Math.floor(i / recindex) * recwidth}  width={30}  height={30}  fill={d.HEX1}/> -->
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
