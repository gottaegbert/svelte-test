
<script>
  import { getContext } from 'svelte';
  import {
    forceSimulation,
  } from 'd3-force';
  const { data } = getContext('LayerCake');

  const simulation = forceSimulation($data)

  let nodes = [];
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });


</script>



{#each nodes as node}
          <circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill={node.HEX1}
            stroke="none"
            stroke-width="1"
          ></circle>
{/each}


