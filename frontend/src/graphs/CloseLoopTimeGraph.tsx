import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import React from "react";

function CloseLoopTimeGraph(): JSX.Element {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize = isLargeScreen ? 33 : 20;
  const barSize = isLargeScreen ? 60 : 40;
  const height = isLargeScreen ? "35vh" : "35vh";
  const strokeWidth = isLargeScreen ? 5 : 3;
  const [data, setData] = useState<any[]>([]);
  const renderLegend = (value: string) => (
    <span style={{ color: "black", fontSize }}>{value}</span>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/frontend/frontend/api/get-time-analysis`
        );
        const result = await response.json();
        console.log("Closed loop time graph------>", result);

        // Limit data points to 20
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div style={{ width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        {data && data.length > 0 && (
          <BarChart
            data={data}
            barGap={15}
            barSize={barSize}
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              strokeWidth={strokeWidth}
              tick={{ fontSize, dy: 10 }}
              tickLine={false}
              dataKey="name"
            />
            <YAxis
              strokeWidth={strokeWidth}
              tick={{ fontSize, dx: -10 }}
              tickLine={false}
              label={{
                value: "Hours",
                angle: -90,
                position: "insideLeft",
                fontSize,
			  }}
			  tickFormatter={(value) => value / 1000} // Converts values from 1000 → 1

            />
					  <Tooltip contentStyle={{ fontSize: fontSize + 2 }}
					     formatter={(value) => (value / 1000).toFixed(2)} // Formats Tooltip values
 />
            <Legend
              formatter={renderLegend}
              wrapperStyle={{ fontSize }}
              tick={{ fontSize }}
            />
            <Bar stackId="a" dataKey="closedLoop" fill="#435f9f" />
            <Bar stackId="a" dataKey="manual" fill="#63a8ff" />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default CloseLoopTimeGraph;
