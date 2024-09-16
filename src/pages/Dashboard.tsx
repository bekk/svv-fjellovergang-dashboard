import React, { useEffect, useState } from 'react';
import { parse } from 'csv-parse/browser/esm/sync';


type Predictions = {
  date: string;
  true_label: boolean;
  prediction_confidence: number;
  prediction: boolean;
};

function Dashboard() {
  const [predictions, setPredictions] = useState<Predictions[]>([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/data/lstm_predictions.csv')
      .then(response => response.text())
      .then(fileContent => {
        const headers = ['date', 'true_label', 'prediction_confidence', 'prediction'];

        // Parse the CSV content
        const result: Predictions[] = parse(fileContent, {
          delimiter: ',',
          columns: headers,
          skip_empty_lines: true
        });

        setPredictions(result);
        console.log(predictions)
      })
      .catch(error => console.error('Error loading the CSV file:', error));
  }, []);
  
  return (
    <div className="App">
      <table>
        <tr>
          <th>date</th>
          <th>true_label</th>
          <th>prediction_confidence</th>
          <th>prediction</th>
        </tr>
          { predictions.map(prediction => (
          <tr>
              <td>{prediction.date}</td>
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
