import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

const data1 = [
  { label: "True", value: 80 },
  { label: "False", value: 20 },
];

function LinePlot({
  width = 400,
  height = 400,
  marginTop = 20,
  marginRight = 20,
  marginBottom = 20,
  marginLeft = 20,
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState([
    25, 70, 45, 60, 46, 44, 60, 32, 80, 40, 100,
  ]);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("overflow", "visible")
      .style("background", "#c5f6fa");
    //x scale
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);
    //yscales
    const yScale = d3.scaleLinear().domain([0, height]).range([height, 0]);

    const generateScaledLine = d3
      .line<number>()
      .x((d, i) => xScale(i))
      .y((d) => yScale(d))
      .curve(d3.curveCardinal);

    // setting axises
    const xAxis = d3.axisBottom(xScale).ticks(1 + data.length);
    const yAxis = d3.axisLeft(yScale).ticks(7);
    svg.append("g").call(xAxis).attr("transform", `translate(0,${height})`);
    svg.append("g").call(yAxis);

    // setting up the data for the svg
    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("d", (d) => generateScaledLine(d))
      .attr("fill", "none")
      .attr("stroke", "black");
  }, [data]);

  return <svg ref={svgRef} style={{ margin: "100px", display: "block" }}></svg>;
}

export default LinePlot;
