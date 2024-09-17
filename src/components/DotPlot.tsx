import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

interface DotPlotProps {
  data: { x: number; y: number }[];
}

const data = [
  { x: 10, y: 20 },
  { x: 15, y: 25 },
  { x: 20, y: 30 },
  { x: 25, y: 35 },
];

function DotPlot() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const width = 500;
      const height = 500;

      svg.attr("width", width).attr("height", height);

      // Set up scales
      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.x) || 1])
        .range([0, width]);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.y) || 1])
        .range([height, 0]);

      // Add dots
      svg
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", (d) => xScale(d.x))
        .attr("cy", (d) => yScale(d.y))
        .attr("r", 5)
        .attr("fill", "steelblue");
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default DotPlot;
