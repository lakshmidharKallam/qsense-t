import React from "react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { BarChart, Bar } from "recharts";


// const data = [
// 	{ month: 'Jan', savings: 10, closedLoopSavings: 7 },
// 	{ month: 'Feb', savings: 20, closedLoopSavings: 10 },
// 	{ month: 'Mar', savings: 35, closedLoopSavings: 20 },
// 	{ month: 'Apr', savings: 50, closedLoopSavings: 34 },
// 	{ month: 'May', savings: 70, closedLoopSavings: 55 },
// 	{ month: 'Jun', savings: 95, closedLoopSavings: 80 },
// 	{ month: 'Jul', savings: 120, closedLoopSavings: 100 },
// 	{ month: 'Aug', savings: 150, closedLoopSavings: 130 },
// 	{ month: 'Sep', savings: 185, closedLoopSavings: 160 },
// 	{ month: 'Oct', savings: 220, closedLoopSavings: 190 },
// 	{ month: 'Nov', savings: 260, closedLoopSavings: 230 },
// 	{ month: 'Dec', savings: 300, closedLoopSavings: 270 },
// ];
// const data = [
// 	{ month: 'Mon', savings: 10, closedLoopSavings: 7 },
// 	{ month: 'Tue', savings: 20, closedLoopSavings: 10 },
// 	{ month: 'Wed', savings: 35, closedLoopSavings: 20 },
// 	{ month: 'Thu', savings: 50, closedLoopSavings: 34 },
// 	{ month: 'Fri', savings: 70, closedLoopSavings: 55 },
// 	{ month: 'Sat', savings: 95, closedLoopSavings: 80 },
// 	{ month: 'Sun', savings: 120, closedLoopSavings: 100 },
// 	{ month: 'Mon', savings: 150, closedLoopSavings: 130 },
// 	{ month: 'Tue', savings: 185, closedLoopSavings: 160 },
// 	{ month: 'Wed', savings: 220, closedLoopSavings: 190 },
// 	{ month: 'Thu', savings: 260, closedLoopSavings: 230 },
// 	{ month: 'Fri', savings: 300, closedLoopSavings: 270 },
// ];

function CostAnalysisGraph(): JSX.Element {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize = isLargeScreen ? 33 : 20;
  const height = isLargeScreen ? "35vh" : "35vh";
  const strokeWidth = isLargeScreen ? 5 : 3;
  const [data, setData] = useState<any[]>([]);

  const renderLegend = (value: string) => (
    <span style={{ color: "black", fontSize }}>{value}</span>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/frontend/frontend/api/get-all-data`);
        const result = await response.json();
        console.log("cost analysys graph ------->", result);
        // Limit data points to 20
        if (result) {
          const reversedData = result.slice().reverse(); 
          setData(reversedData);
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
  return (
    <div style={{ width: "100%", height: height }}>
      <ResponsiveContainer width="100%" height="100%">
        {data && data.length > 0 && (
          <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <XAxis
                dataKey="batch_num"
                tick={{ fontSize: 12, dy: 10 }}
                tickLine={false}
                strokeWidth={1}
              />
              <YAxis
                tick={{ fontSize: 12, dx: -10 }}
                tickLine={false}
                label={{
                  value: "Savings (k$)",
                  angle: -90,
                  position: "insideLeft",
                  fontSize: 12,
                  dx: -15,
                }}
              />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10 }} />
              
              {/* Bars with conditional coloring based on Qsense_closedLoop */}
              <Bar
                dataKey="savings"
                fill={(entry: { Qsense_closedLoop: number; }) => (entry.Qsense_closedLoop === 1 ? "#3b7ddd" : "#153d78")}
                barSize={30}
              />
            </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default CostAnalysisGraph;
