import React from "react";
import { useContext } from "react";
import { contextCreate } from "./Usecontext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

export const Usecontextlist = () => {
  let nav = useNavigate("");

  const {
    rows,
    state,
    city,
    checkedFlag,
    remarkFlag,
    countryFlag,
    addFlag,
    setRows,
    list,
    setList,
    addRow,
    rowFlag,
    ContextValue,
    countryData,
    newRow,
    setNewRow,
    handleCountryChange,
    handleStateChange,
    handleCityChange,
    handleRemarksChange,
    handleInputChange,
    handleCheckboxChange,
    isCheckboxChecked,
    setIsCheckboxChecked,
    isCheckboxDisabled,
    setIsCheckboxDisabled,
    isRemarkDisable,
    handleSave,
    handleCancel,
    handleEdit,
    handleDelete,
    isTableEmpty,
  } = useContext(contextCreate);
  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleSubmit = () => {
    // const isAnyRowEditable = rows.filter((row) => !row.flag);

    if (isTableEmpty) {
      toast.warning(
        "Please add at least one set of details before submitting."
      );
      return;
    }
    
        console.log(ContextValue);
        if (ContextValue.id) {
          console.log("update");
          const obj = {
            id: ContextValue.id,
            location: "",
            remarks: ContextValue.remarks,
            selectedCountry: ContextValue.selectedCountry,
            row: rows,
          };
          const array = list.map((item, index) =>
            item.id === obj.id ? obj : item
          );
          console.log(array);
          setList(array);
        } else {
          console.log("create");
          const obj = {
            id: uuidv4(),
            location: "",
            remarks: ContextValue.remarks,
            selectedCountry: ContextValue.selectedCountry,
            row: rows,
          };
    
          setList([...list, obj]);
        }
   
        ContextValue.setSelectedCountry("");
        ContextValue.setSelectedState("");
        ContextValue.setSelectedCity("");
        ContextValue.setRemarks("");
        ContextValue.setId(null);
        setRows([]);
        nav(`/cmain`);
      };
    

  return (
    <div className="d-flex justify-content-center">
      <div>
        <form className="d-flex justify-content-center">
          <div className="d-flex">
            <label htmlFor="check" className="fw-bold">
              Current location
            </label>
            <input
              type="checkbox"
              className="me-5 ms-2 "
              name="check"
              id="check"
              checked={isCheckboxChecked}
              onChange={handleCheckboxChange}
              disabled={countryFlag || rowFlag}
            />
          </div>
          <div className="d-flex">
            <label htmlFor="country" className="fw-bold">
              Country
            </label>
            <select
              className="me-5 ms-2 "
              id="country"
              value={ContextValue.selectedCountry}
              onChange={handleCountryChange}
              disabled={checkedFlag || rowFlag}
            >
              <option value="">Select a Country</option>
              {countryData
                .filter((country) => country.countryName !== "India") // Exclude India
                .map((country) => (
                  <option key={country} value={country.countryName}>
                    {country.countryName}
                  </option>
                ))}
            </select>
          </div>
          <div className="d-flex">
            <label htmlFor="remark" className="fw-bold">
              Remark
            </label>
            <textarea
              type="text"
              className="ms-2 "
              id="remarks"
              name="remarks"
              value={ContextValue.remarks}
              onChange={handleInputChange}
              disabled={remarkFlag}

            ></textarea>
          </div>
        </form>
        <div className="container ">
          <button
            type="button"
            className="btn btn-info float-end mb-2"
            onClick={addRow}
            disabled={addFlag}
          >
            Add Row
          </button>
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>S.No</th>
                <th>State</th>
                <th>City</th>
                <th>Remark</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index} className="text-center">
                  <td>{index + 1}</td>
                  <td>
                    {!row.flag ? (
                      <select
                        id={`state_${index}`}
                        value={row.state}
                        onChange={(e) => handleStateChange(e, index)}
                      >
                        <option value="">Select a State</option>
                        {state.map((res) => (
                          <option
                            key={res}
                            value={res.stateName}
                            disabled={res === ""}
                          >
                            {res.stateName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.state
                    )}
                  </td>
                  <td>
                    {!row.flag ? (
                      <select
                        id={`city_${index}`}
                        value={row.city}
                        onChange={(e) => handleCityChange(e, index)}
                      >
                        <option value="">Select a City</option>
                        {city.map((city) => (
                          <option key={city} value={city.cityName}>
                            {city.cityName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.city
                    )}
                  </td>
                  <td>
                    {!row.flag ? (
                      <textarea
                        type="text"
                        value={row.remark}
                        onChange={(e) => handleRemarksChange(e, index)}
                      />
                    ) : (
                      <div>{row.remark}</div>
                    )}
                  </td>

                  <td>
                    {!row.flag ? (
                      <>
                        <button
                          type="button"
                          className="btn btn-success me-1"
                          onClick={() => handleSave(index)}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger ms-1"
                          onClick={() => handleCancel(index)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className="btn btn-primary me-1"
                          onClick={() => handleEdit(index)}
                          disabled={addFlag}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger ms-1"
                          onClick={() => handleDelete(index)}
                          disabled={addFlag}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="container d-flex justify-content-center mt-5">
          <button
            type="submit"
            className="btn btn-primary me-4"
            onClick={handleSubmit}
            disabled={addFlag}
          >
            Submit
          </button>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
