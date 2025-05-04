import { Table } from "antd";
import { useEffect, useState, FC } from "react";
import React from "react";
interface AuditData {
  time: string;
  username: string;
  originalMode: string;
  updateMode: string;
  reason: string;
  key?: string | number;
}

interface AuditTableProps {
  updated: boolean;
}

const columns = [
  {
    title: "Timestamp",
    dataIndex: "time",
    key: "timestamp",
  },
  {
    title: "Logged in Username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Original Mode",
    dataIndex: "originalMode",
    key: "originalMode",
  },
  {
    title: "Updated Mode",
    dataIndex: "updateMode",
    key: "updatedMode",
  },
  {
    title: "Reason for Change",
    dataIndex: "reason",
    key: "reason",
  },
];

// Mock data for testing
const mockAuditData: AuditData[] = [
  {
    key: "1",
    time: "2024-03-20 14:30:00",
    username: "john.doe",
    originalMode: "Manual",
    updateMode: "Closed Loop",
    reason: "Process stabilization required",
  },
  {
    key: "2",
    time: "2024-03-20 13:45:00",
    username: "jane.smith",
    originalMode: "Closed Loop",
    updateMode: "Manual",
    reason: "Maintenance check",
  },
  {
    key: "3",
    time: "2024-03-20 12:15:00",
    username: "mike.wilson",
    originalMode: "Manual",
    updateMode: "Closed Loop",
    reason: "Production optimization",
  },
];

const AuditTable: FC<AuditTableProps> = ({ updated }) => {
  const [data, setData] = useState<AuditData[]>([]);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`/frontend/frontend/api/get-audit-data`);
        const result = await response.json();
        console.log("Audit table data----->", result);
        if (!result.error) {
          setData(result);
        }

        console.log("Audit table  loaded");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [updated]);

  return (
    <Table<AuditData>
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered={false}
    />
  );
};

export default AuditTable;