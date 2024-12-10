// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LabelList,
//   Legend,
// } from "recharts";

// export default function Home() {
//   const [isClient, setIsClient] = useState(false);
//   const [data, setData] = useState([]);
//   const [year, setYear] = useState(1950);
//   const [currentYearIndex, setCurrentYearIndex] = useState(0);
//   useEffect(() => {
//     const fetchPopulationData = async () => {
//       try {
//         const response = await axios
//           .get(`http://localhost:8000/populations/${year}`)
//           .then((response) => {
//             console.log(response?.data?.data?.countries);
//             const formattedResponse = response?.data?.data?.countries;
//             // return response?.data?.data;
//             setData(formattedResponse);
//           })
//           .catch((error) => console.error("error =>", error));
//       } catch (error) {
//         console.error("Error fetching population data:", error);
//       }
//     };
//     const interValId = setInterval(() => {
//       fetchPopulationData();
//       if (year < 2020) {
//         setYear((prevParam) => prevParam + 1);
//       } else {
//         setYear(1950); // รีเซ็ตค่ากลับไปที่ 1950
//       }
//     }, 600);
//     return () => clearInterval(interValId);
//   }, [year]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   const CustomLabel = ({ x, y, value }) => (
//     <text
//       x={x + 10} // Offset to the right of the bar
//       y={y + 5} // Adjust vertical alignment
//       fill="black"
//       fontSize="12"
//       textAnchor="start"
//       style={{
//         transition: "all 0.3s ease", // Smooth animation
//       }}
//     >
//       {value.toLocaleString()} {/* Add commas */}
//     </text>
//   );
//   const getColor = (index) => {
//     const colors = ["#8884d8", "#82ca9d", "#ffc658", "#d08484", "#84b6d0"];
//     return colors[index % colors.length]; // ใช้สีวนลูปในกรณีที่ข้อมูลเกินจำนวนสี
//   };
//   const dataA = [
//     { name: "Category A", value: 400 },
//     { name: "Category B", value: 300 },
//     { name: "Category C", value: 200 },
//     { name: "Category D", value: 100 },
//   ];
//   return isClient ? (
//     <div style={{ padding: "20px", textAlign: "center" }}>
//       <h1>Population Growth per Country</h1>
//       <h2>Year: {year}</h2>
//       {/* <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} layout="vertical">
//           <XAxis type="number" />
//           <YAxis type="category" dataKey="name" width={150} />
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} payload={data} />
//           <Bar dataKey="value" fill="#8884d8" isAnimationActive={false}>
//             <LabelList
//               dataKey="value"
//               content={CustomLabel} content={(props) => {
//                 const { x, y, width, value } = props;
//                 // Place the label to the right of the bar
//                 return (
//                   <text
//                     x={x + width + 5} // Adjust the position of the label
//                     y={y + 10} // Vertically center the label with the bar
//                     fill="#8884d8" // Label color
//                     fontSize={12}
//                   >
//                     {value}
//                   </text>
//                 );
//               }}
//             />
//           </Bar>
//         </BarChart> */}
//       {/* </ResponsiveContainer> */}
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart data={data} layout="vertical">
//           <XAxis type="number" />
//           <YAxis type="category" dataKey="name" width={150} />
//           <Tooltip />
//           <Legend verticalAlign="top" height={36} payload={data} />
//           {data.map((entry, index) => (
//             <Bar
//               // key={index}
//               // dataKey="value"
//               // data={[entry]}
//               // fill={(entry, index) => `hsl(${(index * 50) % 360}, 70%, 50%)`}
//               // // fill={getBarColor(index)} // กำหนดสีที่แตกต่างกันให้กับแต่ละ bar
//               // isAnimationActive={false}
//               key={index}
//               dataKey="value"
//               data={[entry]} // ใช้ข้อมูลเฉพาะของแท่งนี้
//               fill={getColor(index)} // ฟังก์ชันสำหรับกำหนดสี
//               isAnimationActive={false}
//             >
//               <LabelList
//                 dataKey="value"
//                 content={(props) => {
//                   const { x, y, width, value } = props;
//                   return (
//                     <text
//                       x={x + width + 5}
//                       y={y + 10}
//                       fill="#8884d8"
//                       fontSize={12}
//                     >
//                       {value}
//                     </text>
//                   );
//                 }}
//               />
//             </Bar>
//           ))}
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   ) : (
//     <div>Loading...</div>
//   );
// }
// "use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
// } from "chart.js";
// import ChartDataLabels from "chartjs-plugin-datalabels"; // นำเข้า plugin สำหรับแสดงตัวเลข

// ChartJS.register(
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
//   Title,
//   ChartDataLabels
// );

// const BarChartRace = () => {
//   const [year, setYear] = useState(1950);
//   const [data, setData] = useState([]);

//   const countries = [
//     "China",
//     "India",
//     "USA",
//     "Russia",
//     "Japan",
//     "Indonesia",
//     "Germany",
//     "Brazil",
//     "UK",
//     "Italy",
//   ];

//   // Mock data ที่กำหนดเองสำหรับแต่ละประเทศ (จำนวนประชากรในหน่วยล้าน)
//   const mockData = [
//     { country: "China", population: 393409038, color: "#36a2eb" },
//     { country: "India", population: 366417754, color: "#36a2eb" },
//     { country: "USA", population: 331002651, color: "#ffce56" },
//     { country: "Russia", population: 145934462, color: "#ffce56" },
//     { country: "Japan", population: 126476461, color: "#36a2eb" },
//     { country: "Indonesia", population: 273523615, color: "#ff6384" },
//     { country: "Germany", population: 83783942, color: "#cc65fe" },
//     { country: "Brazil", population: 212559417, color: "#ffce56" },
//     { country: "UK", population: 1197886011, color: "#cc65fe" },
//     { country: "Italy", population: 60246882, color: "#cc65fe" },
//   ];
//   // const mockData = [
//   //   { country: "China", population: 393409038, color: "#36a2eb" },
//   //   { country: "India", population: 366417754 },
//   //   { country: "USA", population: 331002651 },
//   //   { country: "Russia", population: 145934462 },
//   //   { country: "Japan", population: 126476461 },
//   //   { country: "Indonesia", population: 273523615 },
//   //   { country: "Germany", population: 83783942 },
//   //   { country: "Brazil", population: 212559417 },
//   //   { country: "UK", population: 1197886011 },
//   //   { country: "Italy", population: 60246882 },
//   // ];

//   const [chartData, setChartData] = useState({
//     labels: countries,
//     datasets: [
//       {
//         label: "Population by Country",
//         // data: mockData.map((item) => item.population), // ใช้ mockData เป็นข้อมูล
//         data: [],
//         backgroundColor: mockData.map((item) => item.color), // ใช้สีที่กำหนดให้กับแต่ละประเทศ
//       },
//     ],
//   });
//   const [sumPopulation, setSumPopulation] = useState(0);

//   const [currentYearIndex, setCurrentYearIndex] = useState(0);
//   useEffect(() => {
//     const fetchPopulationData = async () => {
//       try {
//         const response = await axios
//           .get(`http://localhost:8000/populations/${year}`)
//           .then((response) => {
//             console.log(response?.data?.data?.countries);
//             const formattedResponse = response?.data?.data?.countries;
//             const sumPopulation = response?.data?.data?.sumContryPopulation;

//             setSumPopulation(sumPopulation);
//             // return response?.data?.data;
//             setData(formattedResponse);
//             setChartData({
//               labels: countries,
//               datasets: [
//                 {
//                   label: "Population by Country",
//                   // data: mockData.map((item) => item.population), // ใช้ mockData เป็นข้อมูล
//                   data: formattedResponse.map((item) => item.population),
//                   // backgroundColor: mockData.map((item) => item.color), // ใช้สีที่กำหนดให้กับแต่ละประเทศ
//                 },
//               ],
//             });
//           })
//           .catch((error) => console.error("error =>", error));
//       } catch (error) {
//         console.error("Error fetching population data:", error);
//       }
//     };
//     const interValId = setInterval(() => {
//       fetchPopulationData();
//       if (year < 2020) {
//         setYear((prevParam) => prevParam + 1);
//       } else {
//         setYear(1950); // รีเซ็ตค่ากลับไปที่ 1950
//       }
//     }, 300);
//     return () => clearInterval(interValId);
//   }, [year]);

// useEffect(() => {
//   // ตั้งเวลาเพื่ออัปเดตข้อมูลทุกๆ 1 วินาที
//   const interval = setInterval(() => {
//     setCurrentYearIndex((prevIndex) => {
//       const newIndex = (prevIndex + 1) % yearData.length;
//       const sortedData = [...yearData[newIndex].populations]
//         .map((data, index) => ({
//           country: countries[index],
//           population: data,
//           color: mockData[index].color,
//         }))
//         .sort((a, b) => b.population - a.population); // เรียงลำดับจากมากไปหาน้อย

//       // จัดข้อมูลที่เรียงแล้วให้เป็นข้อมูลใหม่ที่จะแสดงในกราฟ
//       const sortedPopulations = sortedData.map((item) => item.population);
//       const sortedCountries = sortedData.map((item) => item.country);
//       const sortedColors = sortedData.map((item) => item.color);

//       const newData = {
//         labels: sortedCountries, // ใช้ชื่อประเทศที่เรียงตามข้อมูล
//         datasets: [
//           {
//             ...chartData.datasets[0],
//             data: sortedPopulations, // ใช้ข้อมูลประชากรที่เรียงตามค่าจำนวน
//             backgroundColor: sortedColors, // สีของแท่งไม่เปลี่ยนตามการสลับ
//           },
//         ],
//       };

//       setChartData(newData); // อัปเดตข้อมูลใหม่ให้กับกราฟ
//       return newIndex;
//     });
//   }, 1000); // ทำให้กราฟเคลื่อนไหวทุกๆ 1 วินาที

//   return () => clearInterval(interval);
// }, [chartData]);

//   return (
//     <div style={{ width: "100%", maxHeight: "700px", margin: "50px" }}>
//       <h3>Year: {year}</h3>
//       <h4>
//         Total Population:{" "}
//         {/* {chartData.datasets[0].data
//           .reduce((acc, val) => acc + val, 0)
//           .toLocaleString()} */}
//         {sumPopulation.toLocaleString()}
//       </h4>

//       <Bar
//         data={chartData}
//         options={{
//           responsive: true,
//           indexAxis: "y", // เปลี่ยนให้กราฟเป็นแนวนอน
//           scales: {
//             x: {
//               beginAtZero: true,
//               ticks: {
//                 callback: function (value) {
//                   return value.toLocaleString(); // แสดงตัวเลขเป็นรูปแบบที่อ่านง่าย
//                 },
//               },
//             },
//             y: {
//               beginAtZero: true,
//             },
//           },
//           animation: {
//             duration: 1000,
//             easing: "easeInOutQuad",
//           },
//           plugins: {
//             datalabels: {
//               display: true, // แสดงตัวเลข
//               color: "black", // สีของตัวเลข
//               anchor: "end", // ตำแหน่งของตัวเลขอยู่ที่ปลายแท่ง
//               align: "end", // จัดตำแหน่งตัวเลขให้ติดขอบขวา
//               formatter: (value) => value.toLocaleString(), // การจัดรูปแบบตัวเลข
//             },
//           },
//         }}
//       />
//     </div>
//   );
// };

// export default BarChartRace;
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const BarChartRace = () => {
  const [year, setYear] = useState(1950);
  const [data, setData] = useState([]);
  const [sumPopulation, setSumPopulation] = useState(0);

  const svgRef = useRef();
  const oldData = [
    {
      year: 1950,
      data: [
        { name: "China", value: 560000000, region: "Asia" },
        { name: "India", value: 450000000, region: "Asia" },
        { name: "USA", value: 150000000, region: "Americas" },
      ],
    },
    {
      year: 1951,
      data: [
        { name: "China", value: 450000000, region: "Asia" },
        { name: "India", value: 360000000, region: "Asia" },
        { name: "USA", value: 560000000, region: "Americas" },
      ],
    },
  ];

  // useEffect(() => {
  //   const fetchPopulationData = async () => {
  //     try {
  //       const response = await axios
  //         .get(`http://localhost:8000/populations/${year}`)
  //         .then((response) => {
  //           console.log(response?.data?.data);
  //           const formattedResponse = response?.data?.data;
  //           const sumPopulation = response?.data?.data?.sumContryPopulation;

  //           setSumPopulation(sumPopulation);
  //           // return response?.data?.data;
  //           setData(formattedResponse);
  //         })
  //         .catch((error) => console.error("error =>", error));
  //     } catch (error) {
  //       console.error("Error fetching population data:", error);
  //     }
  //   };
  //   const interValId = setInterval(() => {
  //     fetchPopulationData();
  //     if (year < 2020) {
  //       setYear((prevParam) => prevParam + 1);
  //     } else {
  //       setYear(1950); // รีเซ็ตค่ากลับไปที่ 1950
  //     }
  //   }, 300);
  //   return () => clearInterval(interValId);
  // }, [year]);
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = 900;
    const height = 600;
    const margin = { top: 40, right: 40, bottom: 20, left: 150 };

    svg.attr("width", width).attr("height", height);

    // สร้าง scale สำหรับแกน x และ y
    const x = d3.scaleLinear().range([margin.left, width - margin.right]);
    const y = d3
      .scaleBand()
      .range([margin.top, height - margin.bottom])
      .padding(0.2);

    // สร้างสีสำหรับแต่ละภูมิภาค
    const color = d3
      .scaleOrdinal()
      .domain(["Asia", "Europe", "Africa", "Oceania", "Americas"])
      .range(d3.schemeTableau10);

    // ฟังก์ชันอัปเดตแผนภูมิ
    const updateChart = (dataForYear) => {
      // อัปเดต domain ของ scale
      x.domain([0, d3.max(dataForYear, (d) => d.value)]);
      y.domain(dataForYear.map((d) => d.name));

      // สร้างหรืออัปเดตแกน x (จำนวนประชากร)
      svg
        .select(".x-axis")
        .attr("transform", `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).ticks(5).tickFormat(d3.format(".2s")))
        .selectAll("text") // เลือกทุกข้อความในแกน Y
        .style("font-size", "16px");
      // สร้างหรืออัปเดตแกน y (ชื่อประเทศ)
      svg
        .select(".y-axis")
        .attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y))
        .selectAll("text") // เลือกทุกข้อความในแกน Y
        .style("font-size", "18px"); //

      // สร้างหรืออัปเดต bars
      const bars = svg.selectAll(".bar").data(dataForYear, (d) => d.name);

      bars
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", x(0))
        .attr("y", (d) => y(d.name))
        .attr("width", 0)
        .attr("height", y.bandwidth())
        .attr("fill", (d) => color(d.region))
        .merge(bars)
        .transition(200)
        .duration(200)
        .attr("x", x(0))
        .attr("y", (d) => y(d.name))
        .attr("width", (d) => x(d.value) - x(0))
        .attr("height", y.bandwidth());

      bars.exit().remove();

      // เพิ่มตัวเลขบน bar
      const labels = svg.selectAll(".label").data(dataForYear, (d) => d.name);

      labels
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", (d) => x(d.value) + 5)
        .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .text((d) => d.value.toLocaleString())
        .merge(labels)
        .transition(200)
        .duration(200)
        .attr("x", (d) => x(d.value) + 5)
        .attr("y", (d) => y(d.name) + y.bandwidth() / 2)
        .text((d) => d.value.toLocaleString());

      labels.exit().remove();
    };

    let yearIndex = 0;
    const fetchPopulationData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:8000/populations/${year}`)
          .then((response) => {
            console.log(response?.data?.data);
            const formattedResponse = response?.data?.data;
            const newData = response?.data?.data?.countries;
            const sumPopulation = response?.data?.data?.sumContryPopulation;

            setSumPopulation(sumPopulation);
            // return response?.data?.data;
            setData(newData);
          })
          .catch((error) => console.error("error =>", error));
      } catch (error) {
        console.error("Error fetching population data:", error);
      }
    };
    const interValId = setInterval(() => {
      const dataForYear = [...oldData[yearIndex].data].sort(
        (a, b) => b.value - a.value
      );
      console.log("oldData=>", dataForYear);
      console.log("newData=>", data);
      fetchPopulationData();
      if (year < 2020) {
        setYear((prevParam) => prevParam + 1);
      } else {
        setYear(1950); // รีเซ็ตค่ากลับไปที่ 1950
      }
      updateChart(data);
    }, 200);
    const legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        (d, i) => `translate(${margin.left + i * 120}, ${margin.top - 30})`
      ); // ปรับตำแหน่งแนวนอน

    legend
      .append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("y", 10)
      .style("fill", color);

    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 18)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d);
    return () => clearInterval(interValId);
    // const interval = setInterval(() => {
    //   const year = data[yearIndex].year;
    //   const dataForYear = [...data[yearIndex].data].sort(
    //     (a, b) => b.value - a.value
    //   );
    //   updateChart(dataForYear);

    //   yearIndex = (yearIndex + 1) % data.length;
    // }, 1500);

    // return () => clearInterval(interval);
  }, [year]);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>Population growth per country 1950 to 2021</h2>
        <h3>Year: {year}</h3>
        <h4>
          Total Population:{" "}
          {/* {chartData.datasets[0].data
           .reduce((acc, val) => acc + val, 0)
           .toLocaleString()} */}
          {sumPopulation.toLocaleString()}
        </h4>
      </div>
      <div style={{ paddingTop: "20px" }}>
        <svg ref={svgRef} style={{ width: "70%", height: "100%" }}>
          <g className="x-axis" />
          <g className="y-axis" />
        </svg>
      </div>
    </div>
  );
};

export default BarChartRace;
