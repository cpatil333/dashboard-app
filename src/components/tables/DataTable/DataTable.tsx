import { useMemo, useState } from "react";
import type { DataTable } from "../../../types/datatable";
import styles from "../../../module/dashboard.module.css";

type DataTableProps = {
  dataTable: DataTable[];
  dataTableLoadering: boolean;
  dataTableHasError: boolean;
};

const DataTable = ({
  dataTable,
  dataTableLoadering,
  dataTableHasError,
}: DataTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<"month" | "sales">("month");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const perPage = 3;
  const totalPages = Math.ceil(dataTable.length / perPage);

  //filtered data
  const filteredData = useMemo(() => {
    if (searchTerm.trim() !== "") {
      return dataTable.filter((item) => {
        return (
          item.month.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.sales.toString().includes(searchTerm)
        );
      });
    }

    return dataTable;
  }, [searchTerm, dataTable]);

  //sorting data
  const sortedData = useMemo(() => {
    const sorted = [...filteredData];

    sorted.sort((a, b) => {
      let comparison = 0;

      if (sortField === "sales") {
        comparison = a.sales - b.sales;
      } else if (sortField === "month") {
        comparison = a.month.localeCompare(b.month);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    return sorted; // ✅ Required
  }, [filteredData, sortField, sortOrder]);

  //pagination data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;

    return sortedData.slice(startIndex, startIndex + perPage);
  }, [sortedData, currentPage]);

  //handling events
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleSort = (field: "month" | "sales") => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }

    setCurrentPage(1);
  };

  if (dataTableLoadering) return <p>Loading data...</p>;
  if (dataTableHasError) return <p>Unable to load data.</p>;

  return (
    <div>
      <div style={{ textAlign: "left" }}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort("month")}>
              Month {sortField === "month" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("sales")}>
              Sales {sortField === "sales" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((data: DataTable) => (
            <tr key={data.month}>
              <td>{data.month}</td>
              <td>{data.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* //pagination controll */}
      <button onClick={handlePrevious} disabled={currentPage == 1}>
        Previous
      </button>
      <span>
        {currentPage} of {totalPages || 1}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default DataTable;
