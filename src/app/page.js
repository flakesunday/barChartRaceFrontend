"use client";
import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import axios from "axios";

const BarChartRace = () => {
  const [year, setYear] = useState(1950);
  const [data, setData] = useState([]);
  const [sumPopulation, setSumPopulation] = useState(0);

  const svgRef = useRef();

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
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const response = await axios
          .get(`${apiUrl}${year}`)
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
  }, [year]);

  return (
    <div style={{ padding: "20px" }}>
      <div>
        <h2>Population growth per country 1950 to 2021</h2>
        <h3>Year: {year}</h3>
        <h4>Total Population: {sumPopulation.toLocaleString()}</h4>
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
