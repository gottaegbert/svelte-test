<!--
  @component
  Generates an SVG force simulation using [d3-force](https://github.com/d3/d3-force). The values here are defaults which you will likely have to customize because every force simulation is different. This technique comes from @plmrry.
 -->
<script>
  import { getContext } from 'svelte';
  import {
    forceSimulation,
    forceX,
    forceY,
    forceManyBody,
    forceCollide,
    forceCenter,
  } from 'd3-force';

  const { data, width, height, xScale, xGet,yGet,yScale, rGet, zGet } = getContext('LayerCake');


  // const GRID_ROWS = Math.ceil(data.nodes.length / GRID_COLS);     
  // const data_structure = {
  //   bars : [...new Set(data.nodes.map(node => node.group))],
  //   bar_counts : [],
  //   bar_rows : []
  // }
  //    for (var i = 0; i < data_structure.bars.length; i++) {
  //   data_structure.bar_counts[i] = data.nodes.map(node => node.group).reduce(function(n, val) {
  //     return n + (val === data_structure.bars[i]);
  //   }, 0);
  //   data_structure.bar_rows[i] = Math.ceil(data_structure.bar_counts[i] / GRID_COLS);
  // }

  
  /** @type {Number} [manyBodyStrength=5] - The value passed into the `.strength` method on `forceManyBody`, which is used as the `'charge'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#manyBody_strength) for more. */
  export let manyBodyStrength = 5;

  /** @type {Number} [xStrength=0.1] - The value passed into the `.strength` method on `forceX`, which is used as the `'x'` property on the simulation. See [the documentation](https://github.com/d3/d3-force#x_strength) for more. */
  export let xStrength = 0.1;

    /** @type {Number} [yStrength=0.075] - The value passed into the `.strength` method on `forceY`. See [the documentation](https://github.com/d3/d3-force#y_strength). */
  export let yStrength = 0.005;

  /** @type {String} [nodeColor] Set a color manually otherwise it will default to the `zScale`. */
  export let nodeColor = undefined;

  /** @type {String} [nodeStroke='#fff'] - The circle's stroke color. */
  // export let nodeStroke = '#fff';

  /** @type {Number} [nodeStrokeWidth=1] - The circle's stroke width, in pixels. */
  export let nodeStrokeWidth = 1;

  /** @type {Boolean} [groupBy=true] - Group the nodes by the return value of the x-scale. If `false`, align all the nodes to the canvas center. */
  export let groupBy = true;
  export  let groupByy = true;

  /* --------------------------------------------
   * Make a copy because the simulation will alter the objects
   */
  const initialNodes = $data.map((d) => ({ ...d }));

  const simulation = forceSimulation(initialNodes)

  let nodes = [];

  simulation.on("tick", () => {
    nodes = simulation.nodes()
  })

  /* ----------------------------------------------
   * When variables change, set forces and restart the simulation
   */
  $: {
    simulation
      .force('x', forceX().x(d => {
        return groupBy === true ? $xGet(d) + $xScale.bandwidth() / 2 : $width / 2;
      }).strength(xStrength))
      .force('y', forceY().y(d => {
        return groupByy === true ? $yGet(d) + $yScale.bandwidth() / 2 : $width / 2;
      }).strength(yStrength))

      .force('center', forceCenter($width / 2, $height / 2))
      // .force('charge', forceManyBody().strength(manyBodyStrength))
      .force('collision', forceCollide().radius(15).strength(1))
  
      .alpha(0.8)
      .restart()
  }




 
</script>
  {#each nodes as point,i}
<g class='node' transform='translate({point.x - $rGet(point)}, {point.y})'>

<rect
      width={10 }
      height={10 }
      fill={nodeColor || point.HEX1}
      transform = "translate(10 0)"
      />

    <rect
      width={10 }
      height={10 }
      fill={nodeColor || point.HEX2}
        transform = "translate(20 0)"
    />
    <rect
      width={10 }
      height={10 }
      fill={nodeColor || point.HEX3}
         transform = "translate(30 0)"
  
    />
    <rect
      width={10 }
      height={10 }
      fill={nodeColor || point.HEX4}
          transform = "translate(40 0)"
    />
    <rect
      width={10 }
      height={10 }
      fill={nodeColor || point.HEX5}
      transform = "translate(50 0)"
    />
  </g>
{/each}
