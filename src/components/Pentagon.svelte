<script>
	import { getContext } from "svelte";

	// const { data} = getContext("LayerCake");
  export let recindex = 30; // 一行30个
  export let data;
  export let width = 800;
  export let height = 800;
  export let radius =400;
  export let positiony = 50; // 每个小方块的宽度
  export let recwidth = 3; // 每个小方块的宽度
  

  
  function getLuminosity(color) {
    const rgb = color.substring(1).match(/.{2}/g).map((c) => parseInt(c, 16));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

    function sortColorsByLuminosity(colors) {
    return colors.sort((a, b) => {
      const luminosityA = getLuminosity(a);
      const luminosityB = getLuminosity(b);
      return luminosityB - luminosityA;
    });
  }

   data.forEach((node) => {
    // Calculate luminosity for each color (HEX1 to HEX5)

    const colors = node.allhex.split(',');
    const sortedColors = sortColorsByLuminosity(colors);
    // Sort colors based on luminosity (ascending order)

    // Update the node with the sorted colors
    node.HEX1 = sortedColors[0];
    node.HEX2 = sortedColors[1];
    node.HEX3 = sortedColors[2];
    node.HEX4 = sortedColors[3];
    node.HEX5 = sortedColors[4];
  });



</script>

  <g>
    <rect x={0} y={0} width="100%" height="100%" fill="white"/>
  <g >
    {#each data as d, i}
    <!-- <g transform={`translate(${(i % recindex) * recwidth + recwidth / 2}, ${Math.floor(i / recindex) * recwidth + recwidth / 2})`}> -->
       <!-- <g transform={`translate(${width / 2 + Math.cos((2 * Math.PI / data.length) * i) * radius}, ${height / 2 + Math.sin((2 * Math.PI / data.length) * i) * radius})`}> -->
         <g transform={`translate(${width / 2 + radius * Math.cos((2 * Math.PI / data.length) * i)}, ${height / 2 + radius * Math.sin((2 * Math.PI / data.length) * i)}) rotate(${(360 / data.length) * i} ${width / 2} ${height / 2})`}>
      <rect x={0} y={positiony} width={3} height={30} fill={d.HEX1} />
      <rect x={0} y={ 2 * positiony} width={3} height={30} fill={d.HEX2} />
      <rect x={0} y={ 3 * positiony} width={3} height={30} fill={d.HEX3} />
      <rect x={0} y={ 4 * positiony} width={3} height={30} fill={d.HEX4} />
      <rect x={0} y={ 5 * positiony} width={3} height={30} fill={d.HEX5} />

        </g>
      <!-- <rect  x={(i % recindex) * recwidth}  y={Math.floor(i / recindex) * recwidth}  width={30}  height={30}  fill={d.HEX1}/> -->
      <!-- <text x={(i % recindex) * recwidth+recwidth/2} y={Math.floor(i / recindex) * recwidth+recwidth/2} text-anchor="middle" font-size="10px" fill="black"> {d.cave}</text> -->
    {/each}
  </g>
</g>
