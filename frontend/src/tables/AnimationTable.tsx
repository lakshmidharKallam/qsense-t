import { useState, useEffect, FC } from "react";
import { Progress } from "antd";
import "../styles/tableStyles.css";
import Card from "../components/Card.tsx";
import { useMediaQuery } from "react-responsive";
import { CheckOutlined } from "@ant-design/icons";
import React from "react";


interface TwoColors {
  "0%": string;
  "100%": string;
}

interface BatchData {
  ACBaseReco: string[];
  SaltReco: string[];
}

interface BatchDetails {
  batchNo: string;
  time: string;
}





const twoColors: TwoColors = {
  "0%": "#81b9f9",
  "100%": "#6482fe",
};

const BatchProductionTable: FC<Props> = ({ data }) => {
  const isLargeScreen = useMediaQuery({ query: "(min-width: 2560px)" });
  const fontSize = isLargeScreen ? "35px" : "25px";
  
  const [cakegradeData, setCakegradeData] = useState<string[]>(['0', '0']);
  const [batchData, setBatchData] = useState<BatchData>({
    ACBaseReco: ['0', '0'],
    SaltReco: ['0', '0'],
  });
  const [batchDetails, setBatchDetails] = useState<BatchDetails>({
    batchNo: "",
    time: "",
  });
  const [progressValues, setProgressValues] = useState<number[]>([0, 0, 0]);
  const [backgroundFill, setBackgroundFill] = useState<number>(0);
  const [operatingMode, setOperatingMode] = useState<"Closed Loop" | "Manual">("Closed Loop");

  interface WaterFillCardProps {
    fillLevel: number;
  }

  const WaterFillCard: FC<WaterFillCardProps> = ({ fillLevel }) => {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: `${fillLevel}%`,
          height: "100%",
          background: operatingMode === "Manual" ? "#ffffff" : "#bed3ff",
          transition: "height 0.5s ease-in-out",
          opacity: 0.6,
          zIndex: 10,
        }}
      />
    );
  };

  const fetchData = async (): Promise<void> => {
    try {
      console.log("Fetching data...");

      const lastTwoCakeGrades = data
        .slice(0, 2)
        .map((obj) => {
          const value = Number(obj.QCAKE_GRADE) || 0;
          return value.toFixed(2);
        });

      setCakegradeData(lastTwoCakeGrades);

      const lastTwoBatches = data.slice(0, 2);
      const lastTwoBatchData: BatchData = {
        ACBaseReco: lastTwoBatches.map((obj) =>
          typeof obj.QACBASE_QTY === "number" && !isNaN(obj.QACBASE_QTY)
            ? obj.QACBASE_QTY.toFixed(2)
            : "0.00"
        ),
        SaltReco: lastTwoBatches.map((obj) =>
          typeof obj.QSALT_QTY === "number" && !isNaN(obj.QSALT_QTY)
            ? obj.QSALT_QTY.toFixed(2)
            : "0.00"
        ),
      };
      setBatchData(lastTwoBatchData);

      const latestBatch = lastTwoBatches[0] || {};

      const formattedDateTime =
        new Date(latestBatch.time).toISOString().split("T")[0] +
        " " +
        new Date(latestBatch.time).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

      setBatchDetails({
        batchNo: latestBatch.batch_num || "",
        time: formattedDateTime || "",
      });

      setOperatingMode(latestBatch.Qsense_closedLoop === 1 ? "Closed Loop" : "Manual");

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const startFilling = (): void => {
    let currentIndex = 0;

    const updateProgress = (): void => {
      if (currentIndex < progressValues.length) {
        let interval = setInterval(() => {
          setProgressValues((prev) => {
            const newProgress = [...prev];

            if (newProgress[currentIndex] < 100) {
              newProgress[currentIndex] += 1;
              setBackgroundFill(
                (newProgress.reduce((a, b) => a + b, 0) /
                  (progressValues.length * 100)) *
                  78
              );
            } else {
              clearInterval(interval);
              currentIndex += 1;
              updateProgress();
            }

            return newProgress;
          });
        }, 50);
      }
    };

    updateProgress();
  };

  useEffect(() => {
    const runFilling = () => {
      setProgressValues([0, 0, 0]); // Reset progress values
      setBackgroundFill(0); // Reset background fill
      fetchData();
      startFilling(); // Start filling animation
    };

    runFilling(); // Start immediately

    const loopInterval = setInterval(runFilling, 30000); // Repeat every 10s

    return () => clearInterval(loopInterval); // Cleanup on unmount
  }, []);

  return (
    <>
      <Card className="relative h-full overflow-hidden">
        <WaterFillCard fillLevel={backgroundFill} />
        <div className="flex">
          <div className="w-4/5">
            <div className="relative z-20">
              <h1>AI Mix-Master&apos;s Live Recommendation</h1>
            </div>
            <div className="flex items-center gap-5 relative z-20 pt-1">
              <div className="flex items-center gap-2 w-1/3">
                <Progress
                  type="circle"
                  size={isLargeScreen ? 90 : 50}
                  percent={progressValues[0]}
                  strokeColor={twoColors}
                  format={(percent) =>
                    percent >= 100 ? (
                      <CheckOutlined
                        style={{
                          color: "#6482fe",
                          fontSize: fontSize,
                        }}
                      />
                    ) : (
                      `${percent}%`
                    )
                  }
                />
                <div>
                  <h4>
                    Cake Grade Prediction{" "}
                    {progressValues[0] >= 100 && `- ${cakegradeData[1]}`}
                  </h4>
                  {progressValues[0] >= 100 && (
                    <h4 className="text-sm largescreen:text-2xl">
                      <span
                        className={
                          cakegradeData[1] < cakegradeData[0] ? "red" : "green"
                        }
                      >
                        {(
                          ((cakegradeData[0] - cakegradeData[1]) /
                            (cakegradeData[1] || 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                      {cakegradeData[1] < cakegradeData[0]
                        ? "increased"
                        : "decreased"}
                    </h4>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/3">
                <Progress
                  type="circle"
                  size={isLargeScreen ? 90 : 50}
                  percent={progressValues[1]}
                  strokeColor={twoColors}
                  format={(percent) =>
                    percent >= 100 ? (
                      <CheckOutlined
                        style={{
                          color: "#6482fe",
                          fontSize: fontSize,
                        }}
                      />
                    ) : (
                      `${percent}%`
                    )
                  }
                />
                <div>
                  <h4>
                    AC Base Recommendation{" "}
                    {progressValues[1] >= 100 && `- ${batchData.ACBaseReco[1]}`}
                  </h4>
                  {progressValues[1] >= 100 && (
                    <h4 className="text-sm largescreen:text-2xl">
                      <span
                        className={
                          batchData.ACBaseReco[1] < batchData.ACBaseReco[0]
                            ? "red"
                            : "green"
                        }
                      >
                        {(
                          ((batchData.ACBaseReco[0] - batchData.ACBaseReco[1]) /
                            (batchData.ACBaseReco[1] || 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>{" "}
                      {batchData.ACBaseReco[1] < batchData.ACBaseReco[0]
                        ? "increased"
                        : "decreased"}
                    </h4>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2 w-1/3">
                <Progress
                  type="circle"
                  size={isLargeScreen ? 90 : 50}
                  percent={progressValues[2]}
                  strokeColor={twoColors}
                  format={(percent) =>
                    percent >= 100 ? (
                      <CheckOutlined
                        style={{
                          color: "#6482fe",
                          fontSize: fontSize,
                        }}
                      />
                    ) : (
                      `${percent}%`
                    )
                  }
                />
                <div>
                  <h4>
                    Salt Recommendation{" "}
                    {progressValues[2] >= 100 && `- ${batchData.SaltReco[1]}`}
                  </h4>
                  {progressValues[2] >= 100 && (
                    <h4 className="text-sm largescreen:text-2xl">
                      <span
                        className={
                          batchData.SaltReco[1] < batchData.SaltReco[0]
                            ? "green"
                            : "red"
                        }
                      >
                        {(
                          ((batchData.SaltReco[0] - batchData.SaltReco[1]) /
                            (batchData.SaltReco[1] || 1)) *
                          100
                        ).toFixed(1)}
                        %
                      </span>{" "}
                      {batchData.SaltReco[1] < batchData.SaltReco[0]
                        ? "increased"
                        : "decreased"}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 flex items-center">
            <div className="relative z-20">
              <h1 className={operatingMode === "Manual" ? "red" : "green"}>
                {operatingMode} Mode
              </h1>{" "}
              <h4 className="text-[#153d78]">
                Batch No - {batchDetails.batchNo}
              </h4>
              <h4 className="text-[#153d78]">Time - {batchDetails.time}</h4>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BatchProductionTable;
