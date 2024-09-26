import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Predictions } from "../../pages/Dashboard";

interface DotPlotProps {
  data: Predictions[];
  w?: number;
  h?: number;
}

const DotPlot: React.FC<DotPlotProps> = ({ data, h = 1200, w = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = h;
  const height = w;
  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 20, right: 30, bottom: 100, left: 55 };

      // Clear previous content
      svg.selectAll("*").remove();

      // Filter data between specified date strings
      const startDate = "2023-05-29 14:00:00";
      const endDate = "2023-05-31 23:00:00";
      const filteredData = data.filter((d) => {
        return d.date >= startDate && d.date <= endDate;
      });

      console.log(filteredData);

      // Convert filtered dates to strings
      const dateStrings = filteredData.map((d) => d.date);

      // Set up scales
      const xScale = d3
        .scaleBand()
        .domain(dateStrings)
        .range([margin.left, width - margin.right])
        .padding(0.5);

      const yScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

      // Set up axis generators
      const xAxis = d3.axisBottom(xScale).ticks(dateStrings.length); // Set number of ticks based on the number of dates
      const yAxis = d3
        .axisLeft(yScale)
        .tickFormat((d) =>
          d === 1 ? "Åpent 1" : d === 0 ? "Stengt 0" : d.toString()
        );
      // Create the axes
      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

      svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(yAxis);
      // Lines
      svg
        .selectAll("myline")
        .data(filteredData)
        .enter()
        .append("line")
        .attr("x1", (d) => xScale(d.date) ?? 0)
        .attr("x2", (d) => xScale(d.date) ?? 0)
        .attr("y1", (d) => yScale(d.true_label) ?? 0)
        .attr("y2", (d) => yScale(d.prediction_confidence) ?? 0)
        .attr("stroke", "grey")
        .attr("stroke-width", "1px");
      // Dots for true_label
      svg
        .selectAll(".true-label")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "true-label")
        .attr("cx", (d) => xScale(d.date) ?? 0) // Use date string
        .attr("cy", (d) => yScale(d.true_label) ?? 0)
        .attr("r", 4)
        .attr("fill", "#077197");

      // Dots for prediction (confidence)
      svg
        .selectAll(".prediction")
        .data(filteredData)
        .enter()
        .append("circle")
        .attr("class", "prediction")
        .attr("cx", (d) => xScale(d.date) ?? 0) // Use date string
        .attr("cy", (d) => yScale(d.prediction_confidence) ?? 0)
        .attr("r", 4)
        .attr("fill", "#FF9600");

      const legend = svg
        .append("g")
        .attr(
          "transform",
          `translate(${w - margin.right + 20}, ${margin.top})`
        );

      // Legend items
      const legendItems = [
        { color: "#077197", label: "Faktisk åpning" },
        { color: "#FF9600", label: "Predikert åpning" },
      ];

      legendItems.forEach((item, i) => {
        const legendGroup = legend
          .append("g")
          .attr("transform", `translate(0, ${i * 30})`);

        legendGroup
          .append("rect")
          .attr("width", 20)
          .attr("height", 20)
          .attr("fill", item.color);

        legendGroup.append("text").attr("x", 30).attr("y", 15).text(item.label);
      });
    }
  }, [data]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};
export default DotPlot;
