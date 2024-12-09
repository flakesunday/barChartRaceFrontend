"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState([]);
  const [year, setYear] = useState(1950);
  const [currentYearIndex, setCurrentYearIndex] = useState(0);
  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8000/populations/${year}`)
          .then((response) => {
            console.log(response?.data?.data?.countries);
            const formattedResponse = response?.data?.data?.countries;
            // return response?.data?.data;
            setData(formattedResponse);
          })
          .catch((error) => console.error("error =>", error));
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };
    const interValId = setInterval(() => {
      fetchPopulationData();
      if (year < 2020) {
        setYear((prevParam) => prevParam + 1);
      } else {
        setYear(1950); // รีเซ็ตค่ากลับไปที่ 1950
      }
    }, 600);
    return () => clearInterval(interValId);
  }, [year]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const CustomLabel = ({ x, y, value }) => (
    <text
      x={x + 10} // Offset to the right of the bar
      y={y + 5} // Adjust vertical alignment
      fill="black"
      fontSize="12"
      textAnchor="start"
      style={{
        transition: "all 0.3s ease", // Smooth animation
      }}
    >
      {value.toLocaleString()} {/* Add commas */}
    </text>
  );

  return isClient ? (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Population Growth per Country</h1>
      <h2>Year: {year}</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" width={150} />
          <Tooltip />
          <Legend verticalAlign="top" height={36} payload={data} />
          <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}>
            <LabelList
              dataKey="value"
              /*content={CustomLabel}*/ content={(props) => {
                const { x, y, width, value } = props;
                // Place the label to the right of the bar
                return (
                  <text
                    x={x + width + 5} // Adjust the position of the label
                    y={y + 10} // Vertically center the label with the bar
                    fill="#8884d8" // Label color
                    fontSize={12}
                  >
                    {value}
                  </text>
                );
              }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
