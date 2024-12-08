'use client'
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; 

interface ReportItem {
  date: string;
  amount: number;
}

const ReportPage: React.FC = () => {
  const [filter, setFilter] = useState<"week" | "month" | "year">("week");
  const [reportData, setReportData] = useState<ReportItem[]>([]);
  const [graphData, setGraphData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchReport() {
      setLoading(true);
      try {
        const response = await fetch(`/api/report?filter=${filter}`);
        const data: ReportItem[] = await response.json();

        setReportData(data);

        setGraphData({
          labels: data.map((item) => item.date),
          datasets: [
            {
              label: "Борлуулалтын дүн",
              data: data.map((item) => item.amount),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [filter]);

  return (
    <div className="p-8">
      <div className="flex space-x-2 mb-6">
        {["week", "month", "year"].map((option) => (
          <button
            key={option}
            className={`px-4 py-2 rounded ${
              filter === option ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setFilter(option)}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>

      {/* Show loading state */}
      {loading && <p>Loading...</p>}

      {/* Table */}
      {!loading && reportData.length === 0 && <p>No data available.</p>}
      {!loading && reportData.length > 0 && (
        <>
          <table className="table-auto w-full border-collapse border border-gray-300 mb-8">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2">Огноо</th>
                <th className="border px-4 py-2">Оролго</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                  <td className="border px-4 py-2">{item.date}</td>
                  <td className="border px-4 py-2">${item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Graph */}
          <div>
            <Bar
              data={graphData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    display: true,
                  },
                },
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ReportPage;
