import React, { useEffect, useState } from "react";
import { parse } from "csv-parse/browser/esm/sync";
import DotPlot from "../components/plots/DotPlot";
import ZoomPlot from "../components/plots/ZoomPlot";
import { BarChart, axisClasses } from "@mui/x-charts";

const COLORS = {
  green: "#52b202",
  yellow: "#ffc60d",
  red: "#ff290d",
};
const mockData = [
  { day: "Mandag", percentage: 80 },
  { day: "Tirsdag", percentage: 50 },
  { day: "Onsdag", percentage: 65 },
  { day: "Torsdag", percentage: 90 },
  { day: "Fredag", percentage: 21 },
];

export type Predictions = {
  date: string;
  true_label: number;
  prediction_confidence: number;
  prediction: number;
};

function Dashboard() {
  const [predictions, setPredictions] = useState<Predictions[]>([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch("/data/lstm_predictions.csv")
      .then((response) => response.text())
      .then((fileContent) => {
        const headers = [
          "date",
          "true_label",
          "prediction_confidence",
          "prediction",
        ];

        // Parse the CSV content
        const result: Predictions[] = parse(fileContent, {
          delimiter: ",",
          columns: headers,
          skip_empty_lines: true,
        });

        setPredictions(result);
        console.log(predictions);
      })
      .catch((error) => console.error("Error loading the CSV file:", error));
  }, []);

  return (
    <div className="App">
      <ZoomPlot data={predictions} />
      <DotPlot data={predictions} />
      <BarChart
        dataset={mockData}
        xAxis={[{ scaleType: "band", dataKey: "day" }]}
        series={[
          {
            dataKey: "percentage",
          },
        ]}
        yAxis={[
          {
            label: "Percentage",
            colorMap: {
              type: "piecewise",
              thresholds: [30, 69],
              colors: [COLORS.red, COLORS.yellow, COLORS.green],
            },
          },
        ]}
        width={350}
        height={300}
        sx={{
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-20px, 0)",
          },
        }}
      ></BarChart>
      <table>
        <tr>
          <th>date</th>
          <th>true_label</th>
          <th>prediction_confidence</th>
          <th>prediction</th>
        </tr>
        {predictions.map((prediction) => (
          <tr>
            <td>{prediction.date.toString()}</td>
            <td>{prediction.true_label}</td>
            <td>{prediction.prediction_confidence}</td>
            <td>{prediction.prediction}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default Dashboard;
