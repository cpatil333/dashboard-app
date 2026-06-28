import { useEffect, useState } from "react";
import type { DataTable } from "../types/datatable";
import datatable from "../data/datatable.json";
export const useDataTable = () => {
  const [dataTable, setDataTable] = useState<DataTable[]>([]);
  const [dataTableLoadering, setDataTableLoadering] = useState(false);
  const [dataTableHasError, setDataTableHasError] = useState(false);

  const dataTableData = datatable;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataTableLoadering(true);
        setDataTable(dataTableData);
      } catch (error) {
        if (error instanceof Error) {
          setDataTableHasError(true);
        }
      } finally {
        setDataTableLoadering(false);
      }
    };
    fetchData();
  }, []);

  return {
    dataTable,
    dataTableLoadering,
    dataTableHasError,
  };
};
