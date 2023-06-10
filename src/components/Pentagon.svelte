<script>
	import { getContext } from "svelte";

	// const { data} = getContext("LayerCake");
  export let recwidth = 50; // 每个小方块的宽度
  export let recindex = 30; // 一行30个
  export let data;
  function trianglePath(x, y, size) {
    const angle = (2 * Math.PI) / 5;
    const halfBase = size * Math.tan(angle / 2);
    const path = `M${x},${y} L${x - halfBase},${y + size} L${x + halfBase},${y + size} Z`;
    return path;
  }
</script>

  <g>
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
</g>
