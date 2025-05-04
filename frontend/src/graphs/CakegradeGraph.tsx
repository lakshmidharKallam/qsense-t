import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useMediaQuery } from "react-responsive";

function CakegradeGraph ({cakeGradeResult}: {cakeGradeResult: any[]}): JSX.Element {
  const [data, setData] = useState<any[]>([]);
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize = isLargeScreen ? 33 : 20;
  const strokeWidth = isLargeScreen ? 5 : 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
		  const data = cakeGradeResult;
		const reverseData = data.slice().reverse();
        console.log("Cakegrade graph----->", reverseData);
		setData(reverseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000);

    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const renderLegend = (value) => (
    <span style={{ color: "black", fontSize }}>{value}</span>
  );

  return (
    <div style={{ width: "100%", height: "20vh" }}>
      <ResponsiveContainer width="100%" height="100%">
        {data && data.length > 0 && (
          <AreaChart
            data={data}
            className="p-1"
            width="95%"
            margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
           <XAxis
			strokeWidth={strokeWidth}
			dataKey="time"
			tick={{ fontSize, dy: 10 }}
			tickLine={false}
			tickFormatter={(value) => {
				if (!value) return "";
				const date = new Date(value);
				return date.toLocaleTimeString("en-GB", {
				hour: "2-digit",
				minute: "2-digit",
				hour12: false,
				}); // Returns HH:mm in 24-hour format
			}}
			/>
            <YAxis
              strokeWidth={strokeWidth}
              tick={{ fontSize, dx: -10 }}
              label={{
                value: "Cakegrade(kgF)",
                angle: -90,
                position: "bottomLeft",
                fontSize,
                dx: -45,
              }}
              tickLine={false}
            />
			<Tooltip
				contentStyle={{ fontSize: fontSize, borderRadius: 10 }}
				formatter={(value) => (Number(value) ? Number(value).toFixed(2) : value)}
				labelFormatter={(value) => {
					if (!value) return "";
					const date = new Date(value);
					return date.toLocaleTimeString("en-GB", {
					hour: "2-digit",
					minute: "2-digit",
					hour12: false,
					}); // Returns HH:mm in 24-hour format
				}}
				/>
            <Legend
              formatter={renderLegend}
              wrapperStyle={{ fontSize }}
              tick={{ fontSize }}
            />
            <Area
              strokeWidth={strokeWidth}
              type="monotone"
              stroke="#153d78"
              dataKey="QCAKE_GRADE"
              fill="#ffffff"
              fillOpacity={0.3}
            />
            <Area
              strokeWidth={strokeWidth}
              type="monotone"
              stroke="#435f9f"
              dataKey="QCAKE_GRADE"
              fill="#ffffff"
              fillOpacity={0.3}
            />
            {/* <Area
							strokeWidth={strokeWidth}
							type="monotone"
							dataKey="optimised"
							stroke="#bed3ff"
							fill="#ffffff"
							fillOpacity={0.3}
						/> */}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export default CakegradeGraph;
