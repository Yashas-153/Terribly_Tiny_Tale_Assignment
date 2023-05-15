import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Text,Label } from 'recharts';

function App() {
  const [chartData, setChartData] = useState(null);
  const [exportdata,setExportData] = useState(null);
  const handleButtonClick = async () => {
    try {
      const response = await fetch('https://www.terriblytinytales.com/test.txt');
      const data = await response.text();

      const words = data.toString().toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
      const wordFrequencies = {};

      words.forEach(word => {
        if (word in wordFrequencies) {
          wordFrequencies[word]++;
        } else {
          wordFrequencies[word] = 1;
        }
      });

      const sortedWords = Object.entries(wordFrequencies)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);

      const sortedHashmap = {};

      for (const [key, value] of sortedWords) {
        sortedHashmap[key] = value;
      }

      const labels = Object.keys(sortedHashmap);
      const values = Object.values(sortedHashmap);
      const dataForBar = labels.map((label, index) => ({
        label,
        value: values[index],
      }));

      setChartData(dataForBar); 
      setExportData(sortedWords);
    } catch (error) {
      console.error(error);
    }
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + exportdata.map(([word, count]) => `${word},${count}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "histogram.csv");
    document.body.appendChild(link);
    link.click();
  };


  return (
      <div>
      <button class = "btn" onClick={handleButtonClick}>Submit</button>
      {chartData && (
        <div class = "barchart">
          <BarChart width={1000} height={600} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" fontSize = {20} stroke="white">
            </XAxis>
            <YAxis fontSize={20} label={{ value: 'Number of occurences', angle: -90, position: 'insideLeft',fontSize:20}}  stroke="white"/>
            <Tooltip
              contentStyle={{ backgroundColor: 'black', color: 'white' }}
              itemStyle={{ color: 'white' }}
            />
            <Bar dataKey="value" fill="#c9bcd9" />
          </BarChart>
          <button class = "btn_export" onClick={handleExport}>Export</button>
        </div>
      )}
      </div>
  );
}

export default App;
