<script>
	import { getContext } from "svelte";

	const { data, xGet, yGet, xScale, yScale } = getContext("LayerCake");
     const colorScale = scaleOrdinal(schemeCategory10);

</script>

<g>
    {#each data as d, i}
      <rect
        x={i * 60}
        y={0}
        width={50}
        height={50}
        fill={colorScale(d.HEX1)}
      />
      <!-- <text
        x={i * 60 + 25}
        y={70}
        text-anchor="middle"
        font-size="12px"
        fill="black"
      >
        {d.num}
      </text> -->
    {/each}
		<!-- <circle {cx} {cy} {r} {fill} {stroke} stroke-width={strokeWidth} /> -->
</g>
