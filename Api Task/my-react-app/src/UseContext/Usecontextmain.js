import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { contextCreate } from "./Usecontext";
import "bootstrap/dist/css/bootstrap.css";

export const Usecontextmain = () => {
  const {
    rows,
    setRows,
    data,
    list,
    setList,
    ContextValue,
    checkedFlag,
    view,
    setView,
  } = useContext(contextCreate);

  let nav = useNavigate("");
  const backtoPage = () => {
    nav(`/ctable`);
  };
  const deleteData = (data, ind) => {
    const array = list;
    const array3 = array.filter((item, index) => item.id !== data.id);
    setList(array3);
  };
  const edit = (data, index) => {
    console.log(data);
    console.log(index);
    ContextValue.setSelectedCountry(data.selectedCountry);
    ContextValue.setRemarks(data.remarks);
    ContextValue.setId(data.id);
    setRows(data.row);
    nav(`/ctable`);
  };
  const View = (data) => {
    setView(data);
    nav(`/view`);
  };


  return (
    <div>
      <div>
        <table className="table mt-4 container border-1">
          <thead>
            <tr className="text-center">
              <th scope="col">SL.NO</th>
              <th scope="col">Country</th>
              <th scope="col">remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {list.map((row, index) => (
              <tr key={index} className="text-center">
                <td>{index + 1}</td>
                <td>
                  {row.selectedCountry === "" ? "India" : row.selectedCountry}
                </td>
                <td>{row.remarks}</td>
                <td>
                  <button
                    type="button"
                    className="me-2 btn btn-primary"
                    onClick={() => edit(row, index)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger me-2"
                    onClick={() => deleteData(row, index)}
                  >
                    Delete
                  </button>
                  { " " }
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => View(row)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-end container">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => backtoPage()}
        >
          Back
        </button>
      </div>
    </div>
  );
};
