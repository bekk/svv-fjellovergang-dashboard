import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";
import { Predictions } from "../pages/Dashboard";

interface ZoomPlotProps {
  data: Predictions[];
}

const ZoomPlot: React.FC<ZoomPlotProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  const width = 700;
  const height = 500;

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);
      const margin = { top: 20, right: 30, bottom: 50, left: 50 };

      // Clear previous content
      svg.selectAll("*").remove();

      // Convert date strings to Date objects
      const dateObjects = data.map((d) => new Date(d.date)); // Convert dates to Date objects

      // Set up scales
      const xScale = d3
        .scaleUtc()
        .domain([d3.min(dateObjects)!, d3.max(dateObjects)!]) // Set the domain as actual Date objects
        .range([margin.left, width - margin.right]);

      const yScale = d3
        .scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

      // Set up axis generators
      const xAxis = svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-45)");

      const yAxis = svg
        .append("g")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yScale));

      // Add dots for true labels
      const trueLabels = svg
        .selectAll(".true-label")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "true-label")
        .attr("cx", (d) => xScale(new Date(d.date))) // Convert date string to Date object here
        .attr("cy", (d) => yScale(d.true_label))
        .attr("r", 6)
        .attr("fill", "blue");

      // Add dots for predictions
      const predictions = svg
        .selectAll(".prediction")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "prediction")
        .attr("cx", (d) => xScale(new Date(d.date))) // Convert date string to Date object here
        .attr("cy", (d) => yScale(d.prediction_confidence))
        .attr("r", 6)
        .attr("fill", "red");

      const zoomBehavior = d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.5, 5])
        .translateExtent([
          [margin.left, 0],
          [width - margin.right, height],
        ])
        .extent([
          [margin.left, 0],
          [width - margin.right, height],
        ])
        .on("zoom", (event: any) => {
          const newXScale = event.transform.rescaleX(xScale);

          // Update x-axis with new scale
          svg
            .select<SVGGElement>(".x-axis")
            .call(d3.axisBottom(newXScale)) // Adjust ticks based on width
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-0.8em")
            .attr("dy", "0.15em")
            .attr("transform", "rotate(-45)");

          // Update position of circles
          trueLabels.attr("cx", (d) => newXScale(new Date(d.date)));
          predictions.attr("cx", (d) => newXScale(new Date(d.date)));
        });

      // Apply zoom behavior to the SVG element
      svg.call(zoomBehavior);
    }
  }, [data]);

  return <svg ref={svgRef} width={width} height={height}></svg>;
};

export default ZoomPlot;
