<script>
  import { getContext } from 'svelte';
  import { arc, hierarchy, partition } from 'd3';
  import * as d3 from 'd3';
  // Retrieve the data from the LayerCake component
  const { data } = getContext('LayerCake');

  // Parse the CSV data into a hierarchical structure
  const root = hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value);

  // Define the dimensions of the SVG container and the radius of the sunburst
  const width = 600;
  const height = 600;
  const radius = Math.min(width, height) / 2;

  // Create a new partition layout
  const layout = partition()
    .size([2 * Math.PI, radius])
    .padding(1);

  // Define the color scale for the sunburst segments
  const colorScale = d3.scaleOrdinal()
    .domain(['cat1', 'cat2'])
    .range(['#ff0000', '#00ff00']);

  // Create the arcs for the sunburst segments
  const arcGenerator = arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1);

  // Calculate the layout and generate the paths
  const paths = layout(root)
    .descendants()
    .filter(d => d.depth > 0)
    .map(d => ({
      path: arcGenerator(d),
      fill: colorScale(d.data.cat1),
    }));

    export { paths };
</script>

<svg width={width} height={height}>
  <g transform={`translate(${width / 2},${height / 2})`}>
    {#each paths as { path, fill }}
      <path d={path} fill={fill}></path>
    {/each}
  </g>
</svg>
