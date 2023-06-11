import {quadtree} from "d3-quadtree";
import constant from "./constant.js";
import jiggle from "./jiggle.js";
import * as d3 from 'd3';


export default function() {
  let nodes, strength = 0.5;

    function x(d) {
      return d.x + d.vx;
    }
    function y(d) {
      return d.y + d.vy;
    }
    function x1(d) {
      return d.x + d.vx - d.width / 2;
    }
    function x2(d) {
      return d.x + d.vx + d.width / 2;
    }
    function y1(d) {
      return d.y + d.vy - d.height / 2;
    }
    function y2(d) {
      return d.y + d.vy + d.height / 2;
    }

    // 检查边界，看两个矩形是否重叠
    function isOverlay (node1, node2) {
      const node1Width = node1.width;
      const node1Height = node1.height;
      const node2Width = node2.width;
      const node2Height = node2.height;
      return (
        Math.abs(Math.max(x2(node1) - x1(node2), x2(node2) - x1(node1))) <
          node1Width + node2Width &&
        Math.abs(Math.max(y2(node1) - y1(node2), y2(node2) - y1(node1))) <
          node1Height + node2Height
      );
    };

    function force() {
      const tree = quadtree(nodes, x, y);
      for (let i = 0; i < nodes?.length || 0; ++i) {
        const node = nodes[i];
        tree.visit(function (quad, _x0, _y0, _x1, _y1) {
          if (!quad.length) {
            do {
              const { data } = quad;
              const nodeWidth = node.width;
              const nodeHeight = node.height;
              const dataWidth = data.width;
              const dataHeight = data.height;
              if (data) {
                if (data.index > node.index && isOverlay(node, data)) {
                  let dx = Math.abs(Math.max(x2(node) - x1(data), x2(data) - x1(node)));
									dx = Math.abs(nodeWidth + dataWidth - dx);
                  let dy = Math.abs(Math.max(y2(node) - y1(data), y2(data) - y1(node)));
                  dy = Math.abs(nodeHeight + dataHeight - dy);

                  let vectorX = x(node) - x(data);
                  let vectorY = y(node) - y(data);
                  
                  // 单位化向量
                  if (vectorX === 0 && vectorY === 0) {
                    vectorX = 1;
                    vectorY = 1;
                  } else if (vectorX !== 0 && vectorY !== 0) {
                    const vectorR = Math.sqrt(vectorX**2 + vectorY**2);
                    vectorX = vectorX / vectorR;
                    vectorY = vectorY / vectorR;
                    if (Math.abs(dx / vectorX) > Math.abs(dy / vectorY)) {
                      dy = Math.abs(dy / vectorY) * vectorY;
                      dx = Math.abs(dy) * vectorX / Math.abs(vectorY);
                    } else {
                      dx = Math.abs(dx / vectorX) * vectorX;
                      dy = Math.abs(dx) * vectorY / Math.abs(vectorX);
                    }
                  }

                  // 计算碰撞体的面积，将面积视为质量，移动距离视为速度，遵循动量守恒定律
                  node.vx +=
                    (Math.abs(dx) / vectorX * strength * dataWidth * dataHeight) /
                    (nodeWidth * nodeHeight + dataWidth * dataHeight);
                  data.vx -=
                    (Math.abs(dx) / vectorX * strength * nodeWidth * nodeHeight) /
                    (nodeWidth * nodeHeight + dataWidth * dataHeight);
                  node.vy +=
                    (Math.abs(dy) / vectorY * strength * dataHeight * dataWidth) /
                    (dataHeight * dataWidth + nodeHeight * nodeWidth);
                  data.vy -=
                    (Math.abs(dy) / vectorY * strength * nodeHeight * nodeWidth) /
                    (dataHeight * dataWidth + nodeHeight * nodeWidth);
                }
                return;
              }
              return x2(node) < _x0 || x1(node) > _x1 || y2(node) < _y0 || y1(node) > _y1;
            } while ((quad = quad.next));
          }
        });
      }
    }

    force.initialize = function (_) {
      nodes = _;
    };

    force.strength = function (_strength) {
      strength = _strength
    };

    return force;
}

