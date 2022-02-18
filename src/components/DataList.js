import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { getAllUsers } from "../utils/ApiService";

const columns = [
  { field: "SNo", headerName: "S.No", width: 120 },
  { field: "personalNo", headerName: "P.No", width: 120 },
  { field: "name", headerName: "Name", width: 120 },
  { field: "fatherName", headerName: "f/hname", width: 150 },
  { field: "address", headerName: "Address", width: 200 },
  { field: "DOE", headerName: "DOE", width: 150 },
  { field: "DOB", headerName: "DOB", width: 150 },
  { field: "DOBelt", headerName: "DOBelt", width: 150 },
  { field: "DOAddition", headerName: "DOAddition", width: 150 },
  { field: "qualification", headerName: "Qualification", width: 150 },
  { field: "occupation", headerName: "Occupation", width: 150 },
  { field: "contact1", headerName: "Contact", width: 150 },
  { field: "gender", headerName: "Gender", width: 150 },
  { field: "remark", headerName: "Remark", width: 150 },
  {
    field: "groupIncharge",
    headerName: "Group incharge",
    description: "Group incharge name",
    width: 150,
  },
  { field: "bloodGroup", headerName: "Bloodgroup", width: 150 },
];

export default function DataList() {
  let [result, setResult] = useState([]);
  let rows = [];

  useEffect(() => {
    async function fetchData() {
      // console.log("fetching data");
      let resultData = await getAllUsers();
      setResult(resultData.data);
    }
    fetchData();
    // console.log("result", result);
  }, []);

  if (result && result.length > 0) {
    result.forEach((user) => {
      rows.push(user);
    });
    console.log("rows:", rows);
  }

  return (
    <>
      <div style={{ height: "1000px", width: "auto" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          components={{
            Toolbar: GridToolbar,
          }}
          filterModel={{
            items: [
              {
                columnField: "gender",
                operatorValue: "equals",
                value: "male",
              },
            ],
          }}
        />
      </div>
    </>
  );
}
