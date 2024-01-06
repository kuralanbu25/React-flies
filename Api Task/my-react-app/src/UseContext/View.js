import React,{useContext, useEffect} from 'react'
import { contextCreate } from './Usecontext';
import { useNavigate } from 'react-router-dom';

export const View = () => {
    const { rows, view, ContextValue, countryData } = useContext(contextCreate);

    useEffect(() => {
      console.log(view);
    }, []);
    let nav = useNavigate("");
    const backtoPage = () => {
      nav(`/cmain`);
    };
  return (
    <div>
      <div className="container card invoice p-5  mt-5">
        <div className=" container text-start">
          <hr></hr>
          <p>
            <span className="fw-bold">Location: </span>
            {view.selectedCountry === "" ? "India" : view.selectedCountry}
          </p>
          <p>
            <span className="fw-bold">Remarks:</span> {view.remarks}
          </p>
          <hr></hr>
        </div>
        <div className=" container mt-3 text-start">
          <h6>Details</h6>
          <table className="table mt-3 ">
            <thead>
              <tr>
                <th scope="col">SI.NO</th>
                <th scope="col">State</th>
                <th scope="col">City</th>
                <th scope="col">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {view.row &&
                view.row.map((data, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{data.state}</td>
                    <td>{data.city}</td>
                    <td>{data.remark}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <button className="btn btn-secondary" onClick={() => backtoPage()}>
            back
          </button>
        </div>
      </div>
    </div>
  );
}
