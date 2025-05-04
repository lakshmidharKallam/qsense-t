import { useEffect, useState, FC } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  Line,
} from "recharts";
import { useMediaQuery } from "react-responsive";

interface BatchData {
  time: string;
  batch_num: string;
  RecipeCode: number;
  "WB 5803 Amount Charged": number;
  QACBASE_QTY: number;
  QSALT_QTY: number;
  key?: string;
}

interface BatchProductionTableProps {
  batchResult: BatchData[];
}

interface RecipeMapping {
  [key: number]: string;
}

const recipeMapping: RecipeMapping = {
  1: 'TIDE_VSS',
  2: 'TIDE_JR',
  3: 'TIDE_OR',
  4: 'TIDE_FR',
  5: 'TIDE_TL',
  6: 'TIDE_SAWM',
  7: 'ARIEL_CNS',
  8: 'MATIC_FL',
  9: 'MATIC_TL_OPT',
  10: 'ARIEL_HW',
  11: 'ARIEL_SA',
  12: 'TIDE_SJ-BP',
  13: 'TIDE_SO-BP',
  14: 'Tide_LV',
  15: 'TIDE_NJ',
  16: 'TIDE_NL',
  17: 'TIDE_SL',
  18: 'TIDE_NO',
  19: 'ARIEL_RW',
};

const BatchProductionTable: FC<BatchProductionTableProps> = ({ batchResult }) => {
  const [viewMode, setViewMode] = useState<'chart' | 'table'>('chart');
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize: number = isLargeScreen ? 33 : 20;
  const strokeWidth: number = isLargeScreen ? 5 : 3;
  const scrollHeight: number = isLargeScreen ? 2.7 : 1.3;
  const [data, setData] = useState<BatchData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setData(batchResult);
        console.log("Batch Production data ------->", batchResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 20000);

    return () => clearInterval(intervalId);
  }, [batchResult]);

  const buttonStyle = {
    fontSize,
    padding: isLargeScreen ? "0px 10px" : "1px 5px",
    marginRight: "10px",
    color: "#153d78",
  };

  const columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "timestamp",
      width: 100,
      render: (value: string) => {
        if (!value) return "";
        const date = new Date(value);
        const formattedDate = date.toISOString().split("T")[0];
        const formattedTime = date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        return `${formattedDate} ${formattedTime}`;
      },
    },
    {
      title: "Batch No.",
      dataIndex: "batch_num",
      key: "batchNo",
      width: 70,
    },
    {
      title: "Batch Size",
      dataIndex: "RecipeCode",
      key: "batchSize",
      width: 70,
      render: (recipeCode: number) => {
        return [1, 4].includes(recipeCode) ? 1250 : 1300;
      },
    },
    {
      title: "Recipe",
      dataIndex: "RecipeCode",
      key: "brand",
      width: 90,
      render: (value: number) => recipeMapping[value] || "Unknown",
    },
    {
      title: "AC Base PV",
      dataIndex: "WB 5803 Amount Charged",
      key: "acBaseSPPV",
      width: 70,
      render: (value: number) => (value ? parseFloat(value.toString()).toFixed(2) : ""),
    },
    {
      title: "AC Reco",
      dataIndex: "QACBASE_QTY",
      key: "ACBaseReco",
      width: 70,
      render: (value: number) => (value ? parseFloat(value.toString()).toFixed(2) : ""),
    },
    {
      title: "Salt Reco",
      dataIndex: "QSALT_QTY",
      key: "SaltReco",
      width: 70,
      render: (value: number) => (value ? parseFloat(value.toString()).toFixed(2) : ""),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <h1>Batch Production Record</h1>
        <div className="flex">
          <Link
            style={buttonStyle}
            className={`border-2 largescreen:border-4 ${
              viewMode === "chart" ? "border-[#153d78]" : "border-white"
            } rounded-md`}
            onClick={() => setViewMode("chart")}
            to=""
          >
            Chart View
          </Link>
          <Link
            className={`border-2 largescreen:border-4 ${
              viewMode === "table" ? "border-[#153d78]" : "border-white"
            } rounded-md`}
            style={buttonStyle}
            onClick={() => setViewMode("table")}
            to=""
          >
            Table View
          </Link>
        </div>
      </div>
      {viewMode === "table" ? (
        <Table<BatchData>
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ y: `${scrollHeight * 100}px`, x: "max-content" }}
          bordered={false}
          rowKey="batch_num"
        />
      ) : (
        <div style={{ width: "100%", height: "30vh" }}>
          <ResponsiveContainer width="100%" height="100%">
            {data && data.length > 0 && (
              <LineChart
                data={data}
                margin={{ top: 10, right: 20, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <Legend
                  wrapperStyle={{ fontSize }}
                  verticalAlign="top"
                />
                <XAxis
                  strokeWidth={strokeWidth}
                  dataKey="timestamp"
                  tick={{ fontSize }}
                  tickLine={false}
                />
                <YAxis
                  strokeWidth={strokeWidth}
                  tick={{ fontSize, dx: -10 }}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value: number) => 
                    value ? parseFloat(value.toString()).toFixed(2) : ''
                  }
                />
                <Line
                  type="monotone"
                  dataKey="QACBASE_QTY"
                  name="AC Recommendation"
                  stroke="#153d78"
                  strokeWidth={strokeWidth}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default BatchProductionTable;