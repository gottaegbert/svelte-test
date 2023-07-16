
<script>
  import { getContext,onMount } from 'svelte';
  import {
    forceSimulation,
  } from 'd3-force';
  import * as d3 from 'd3';

 
  const { data } = getContext('LayerCake');
  const height = 600;
  const width  = 600;
    const GRID_SIZE = 30;
    const GRID_COLS = 1;
    const initialNodes = $data.map((d) => ({ ...d }));
    // console.log(initialNodes);
    const data_structure = {
      bars: [...new Set($data.map((node) => node.groupperiod))],
    //   bars: [$data.map(() => data.groupperiod)],
      bar_counts: [],
      bar_rows: [],
    };

  
  // console.log(data_structure.bars);
  // console.log("data_structure.bars.length+"+ initialNodes.length);

  for (let i = 0; i < data_structure.bars.length; i++) {
    data_structure.bar_counts[i] =$data.map((node)=>node.groupperiod)
      .reduce(function (n, val) {
        return n + (val === data_structure.bars[i]);
      }, 0);

    data_structure.bar_rows[i] = Math.ceil(
      data_structure.bar_counts[i] / GRID_COLS
    );
  }
  console.log(data_structure.bar_counts);
  console.log(data_structure.bar_rows);

  const GRID_ROWS = Math.ceil($data.length / GRID_COLS);

  let grid = {
    cells: [],

    init: function () {
      this.cells = {};

      for (let bar = 0; bar < data_structure.bars.length; bar++) {
        let curr_g = (this.cells[bar] = []);
        let bar_cells = [];
        let cells_count = data_structure.bar_counts[bar];

        let start_x = bar * (GRID_COLS + 1) * GRID_SIZE;

        for (let r = 0; r < GRID_ROWS; r++) {
          for (let c = 0; c < GRID_COLS; c++) {
            if (cells_count <= 0) continue;

            let cell = {
              y: start_x + c * GRID_SIZE,
              x: -(height - 0.4*r * GRID_SIZE)+500,
              occupied: false,
            };

            this.cells[bar].push(cell);
            cells_count--;
          }
        }
      }
    },

    sqdist: function (a, b) {
      return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    },

    occupyNearest: function (p) {
      let bar_i = data_structure.bars.indexOf(p.groupperiod);
      let minDist = Infinity;
      let d;
      let candidate = null;

      for (let i = 0; i < this.cells[bar_i].length; i++) {
        if (
          !this.cells[bar_i][i].occupied &&
          (d = this.sqdist(p, this.cells[bar_i][i])) < minDist
        ) {
          minDist = d;
          candidate = this.cells[bar_i][i];
        }
      }
      if (candidate) candidate.occupied = true;
      return candidate;
    },
  };
  
  // const simulation = forceSimulation($data)
  const simulation = forceSimulation(initialNodes)
  
  // const simulation = forceSimulation(initialNodes)
  //   .force('charge', d3.forceManyBody().strength(5))
  //   .force('center', d3.forceCenter(width / 2, height / 2))
  //   .force('collision', d3.forceCollide().radius(5))
  //   .stop();
  

// rec version
const square = d3.symbol().type(d3.symbolSquare).size(100);

  let nodes = [];
  simulation.on("tick", () => {
    grid.init();
    nodes = simulation.nodes();
    nodes.forEach(function(d) { 
      let gridpoint = grid.occupyNearest(d);
      if (gridpoint) {            
          // ensures smooth movement towards final positoin
          d.x += (gridpoint.x - d.x) * .02;
          d.y += (gridpoint.y - d.y) * .02;
        }
        return d
     })
 
 nodes.forEach((node) => {
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
  }); 

    // Function to calculate luminosity of a color
  function getLuminosity(color) {
    const rgb = color.substring(1).match(/.{2}/g).map((c) => parseInt(c, 16));
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
  }

    function sortColorsByLuminosity(colors) {
    return colors.sort((a, b) => {
      const luminosityA = getLuminosity(a);
      const luminosityB = getLuminosity(b);
      return luminosityA - luminosityB;
    });
  }

//   function drag(simulation) {

//   function dragstarted(d) {
//     if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//     d.fx = d.x;
//     d.fy = d.y;
//   }
  
//   function dragged(d) {
//     d.fx = d3.event.x;
//     d.fy = d3.event.y;
//   }
  
//   function dragended(d) {
//     if (!d3.event.active) simulation.alphaTarget(0);
//     d.fx = null;
//     d.fy = null;
//   }
  
//   return d3.drag()
//       .on("start", dragstarted)
//       .on("drag", dragged)
//       .on("end", dragended);
// }



</script>



{#each nodes as node}

          <path
            d={square(node)}
            transform={`translate(${[node.x, node.y]})`}
            fill={node.HEX1}
            stroke="none"
            stroke-width="1"
          >
          </path>
          <path
            d={square(node)}
            transform={`translate(${[node.x, node.y+10]})`}
            fill={node.HEX2}
            stroke="none"
            stroke-width="1"
          >
          </path>
             <path
            d={square(node)}
            transform={`translate(${[node.x, node.y+2*10]})`}
            fill={node.HEX3}
            stroke="none"
            stroke-width="1"
          >
          </path>
             <path
            d={square(node)}
            transform={`translate(${[node.x, node.y+3*10]})`}
            fill={node.HEX4}
            stroke="none"
            stroke-width="1"
          >
          </path>
            <path
            d={square(node)}
            transform={`translate(${[node.x, node.y+4*10]})`}
            fill={node.HEX5}
            stroke="none"
            stroke-width="1"
          >
          </path>      
{/each}


