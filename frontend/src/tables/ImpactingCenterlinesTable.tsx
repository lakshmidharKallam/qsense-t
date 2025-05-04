import { useEffect, useState } from "react";
import { Select } from "antd";
import React from "react";
import "../styles/SelectionStyles.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";

const { Option } = Select;



const columns = [
  {
    title: "Timestamp",
    dataIndex: "timestamp",
    key: "timestamp",
  },
  {
    title: "Recipe",
    dataIndex: "recipe",
    key: "recipe",
  },
  {
    title: "Blue MCAS Room Temp",
    dataIndex: "blueMCASRoomTemp",
    key: "blueMCASRoomTemp",
  },
  {
    title: "MCAS Room Temp",
    dataIndex: "mcasRoomTemp",
    key: "mcasRoomTemp",
  },
  {
    title: "Temperature 4th Floor",
    dataIndex: "temperature4thFloor",
    key: "temperature4thFloor",
  },
  {
    title: "MT 4th Floor",
    dataIndex: "mt4thFloor",
    key: "mt4thFloor",
  },
  {
    title: "RH 7302",
    dataIndex: "rh7302",
    key: "rh7302",
  },
  {
    title: "SRA Room Temp",
    dataIndex: "sraRoomTemp",
    key: "sraRoomTemp",
  },
  {
    title: "MM1 Spray On Perfume Line Pressure",
    dataIndex: "mm1PerfumeLinePressure",
    key: "mm1PerfumeLinePressure",
  },
  {
    title: "MM2 Spray On Perfume Line Pressure",
    dataIndex: "mm2PerfumeLinePressure",
    key: "mm2PerfumeLinePressure",
  },
  {
    title: "MM3 Spray On Perfume Line Pressure",
    dataIndex: "mm3PerfumeLinePressure",
    key: "mm3PerfumeLinePressure",
  },
];

const ImpactingCenterlinesTable = () => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize = isLargeScreen ? 33 : 20;
  const strokeWidth = isLargeScreen ? 5 : 3;
  const [data, setData] = useState([]);
  const [chart1, setChart1] = useState("");
  const [chart2, setChart2] = useState("");

  const handleChart1Change = (value) => {
    setChart1(value);
  };
  const handleChart2Change = (value) => {
    setChart2(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/frontend/frontend/api/get-centerlines-data`
        );
        const result = await response.json();

        // Limit data points to 20
        console.log("impacting centerlines ------->", result);
        setData(data);
        if (data) {
          setData(result);
          setChart1(Object.keys(result)[0]);
          setChart2(Object.keys(result)[1] || "");
        } else {
          console.log("error code --->", result.code);

          setData({});
          setChart1("");
          setChart2("");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const getChartData = (key) => {
    console.log(key);
    return data[key];
  };
  const checkLength = data.length;
  return (
    <div>
      <div className="flex justify-between">
        <h1>Process Centerlines</h1>
      </div>
      <div className="flex gap-4 largescreen:gap-8">
        <div className="w-1/2 h-[25vh]">
          <Select
            value={chart1}
            dropdownStyle={{ fontSize: "70px" }}
            onChange={handleChart1Change}
            style={{ width: "100%", marginBottom: 16 }}
          >
            {chart1 != "" &&
              Object.keys(data).map((col) => (
                <Option key={col} value={col}>
                  {col}
                </Option>
              ))}
          </Select>

          <ResponsiveContainer width="100%" height="100%">
            {chart1 != "" ? (
              <LineChart
                data={getChartData(chart1)}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize, dy: 10 }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize, dx: -10 }} tickLine={false} />
                <Tooltip
                  tick={{ fontSize }}
                  formatter={(value) => (value ? parseFloat(value).toFixed(2) : '')}
                />
                <Legend wrapperStyle={{ fontSize }} tick={{ fontSize }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#153d78"
                  strokeWidth={strokeWidth}
                />
              </LineChart>
            ) : (
              <p>Error connecting with influx</p>
            )}
          </ResponsiveContainer>
        </div>

        <div className="w-1/2 h-[25vh]">
          <Select
            value={chart2}
            onChange={handleChart2Change}
            style={{ width: "100%", marginBottom: 16 }}
          >
            {chart2 != "" &&
              Object.keys(data).map((col) => (
                <Option key={col} value={col}>
                  {col}
                </Option>
              ))}
          </Select>
          <ResponsiveContainer width="100%" height="100%">
            {chart2 != "" ? (
              <LineChart
                data={getChartData(chart2)}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize, dy: 10 }}
                  tickLine={false}
                />
                <YAxis tick={{ fontSize, dx: -10 }} tickLine={false} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize }} tick={{ fontSize }} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#153d78"
                  strokeWidth={strokeWidth}
                />
              </LineChart>
            ) : (
              <p>Error connecting with influx</p>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ImpactingCenterlinesTable;
