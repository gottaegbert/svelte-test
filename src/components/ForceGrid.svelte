
<script>
  import { getContext,onMount } from 'svelte';
  import {
    forceSimulation,
    forceCenter,
    forceCollide,
    forceX,
    forceY,
  } from 'd3-force';
  import * as d3 from 'd3';

 
  const { data } = getContext('LayerCake');
const height = 600;
    const width  = 600;
    const GRID_SIZE = 15;
    const GRID_COLS = 5;
    const initialNodes = $data.map((d) => ({ ...d }));
    // console.log(initialNodes);
    const data_structure = {
      bars: [...new Set($data.map((node) => node.groupperiod))],
    //   bars: [$data.map(() => data.groupperiod)],
      bar_counts: [],
      bar_rows: [],
    };

  console.log(data_structure.bars);
  console.log("data_structure.bars.length+"+ initialNodes.length);

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
              x: start_x + c * GRID_SIZE,
              y: height - r * GRID_SIZE,
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
  
  
  // grid.init();
//   console.log(data.filter((node) => node.group === 1));
  // const nodes = $data.map((d) => ({ ...d }));

  // const svg = d3.select('.chart-container')
  //   .append('svg')
  //   .attr('width', width)
  //   .attr('height', height);

  const simulation = forceSimulation($data)
    // .force("center", d3.forceCenter(width / 2, height / 2));
// circle version
//   const node = svg.append("g")
//     .attr("stroke", "#fff")
//     .attr("stroke-width", 1.5)
//     .selectAll("circle")
//     .data(nodes)
//     .join("circle")
//     .attr("r", 5)
//     .attr("fill", 'yellow')
//     // .call(drag(simulation));
//         function passvalue(d){
//            grid.init();
//           let gridpoint = grid.occupyNearest(d);
//           if(gridpoint){
//             d.x += (gridpoint.x - d.x) * 0.05;
//             d.y += (gridpoint.y - d.y) * 0.05;
//           }
//           return d;}

// simulation.on("tick", () => {
//     grid.init();
  
//     node.each(function (d) {
//       let gridpoint = grid.occupyNearest(d);
//       if (gridpoint) {
//         d.x += (gridpoint.x - d.x) * 0.05;
//         d.y += (gridpoint.y - d.y) * 0.05;
//       }
//     })
//       node.attr("cx", d => d.x)
//       .attr("cy", d => d.y);
//   }
//   );
  

// rec version
// const square = d3.symbol().type(d3.symbolSquare).size(150);
// const node = svg.append('g')
//         .attr("stroke", "#fff")
//         .attr("stroke-width", 1.5)
//     .selectAll('path')
//     .data(nodes)
//     .join('path')
//     .attr('d', d => square(d))
//     .attr('fill', d=>d.HEX1) 
//       // .call(drag(simulation))
  
$:{
  simulation
  .force(
        "x",
        forceX()
          .x(d => d.x)
          .strength(0.8)
      )
    .force(
        "y",
        forceY()
          .y(d => d.y)
          .strength(0.8)
          )
      .force("collide", forceCollide().radius(2))
      .alpha(0.3) // [0, 1] The rate at which the simulation finishes. You should increase this if you want a faster simulation, or decrease it if you want more "movement" in the simulation.
      .alphaDecay(0.0005) // [0, 1] The rate at which the simulation alpha approaches 0. you should decrease this if your bubbles are not completing their transitions between simulation states.
      // .stop()
      .restart()
}

  let nodes = [];
  simulation.on("tick", () => {
    nodes = simulation.nodes();
  });
// $:{ 
//   simulation.on('tick', () => {
//     grid.init();
//     node
//         .each(function(d) { 
//           let gridpoint = grid.occupyNearest(d);
//           if (gridpoint) {            
//               // ensures smooth movement towards final positoin
// 							d.x += (gridpoint.x - d.x) * .05;
// 							d.y += (gridpoint.y - d.y) * .05;
            
//               // jumps directly into final position  
//               // d.x = gridpoint.x;
//               // d.y = gridpoint.y
// 						}
//          })
//         .attr("x", d => d.x)
//         .attr("y", d => d.y)
//         .attr('transform', d => `translate(${[d.x, d.y]})`);
//     });
//   }
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
console.log("simulation",simulation)

grid.init();
         
        //  let cell = grid.occupyNearest(node);
         

</script>



{#each nodes as node, index}
   
  <!-- {#if grid.cells[index / GRID_COLS]}
    {#each grid.cells[index / GRID_COLS] as cell}
      {#if !cell.occupied}
        {#if node.groupperiod === data_structure.bars[Math.floor(index / GRID_COLS)]} -->
          <circle
               cx={node.x}
                 cy={node.y}
            r="5"
            fill={node.HEX1}
            stroke="none"
            stroke-width="1"
          ></circle>
        
          <circle
            cx={node.x}
            cy={node.y}
            r="5"
            fill={node.HEX1}
            stroke="none"
            stroke-width="1"
          ></circle>
        
        <!-- {/if} 
      {/if}
    {/each}
  {/if} -->
{/each}


