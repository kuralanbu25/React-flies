import React from 'react'
import { useLocation } from 'react-router-dom';

export const Componenttable = () => {
    const location = useLocation();
    const { productsData } = location.state || {};
  return (
    <div>
        <div className="container outer">
      <div className="mt-2 d-flex justify-content-start">
        <button
          type="submit"
          className="rounded fw-bold text-dark border-0 btn btn-info"
        //   onClick={Back}
        >
          Back
        </button>
      </div>

      <table className="table mt-4   border-1">
        <thead>
          <tr>
            <th scope="col">SI.NO</th>
            <th scope="col">Name</th>
            <th scope="col">Bill No</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Date</th>
            <th scope="col">Address</th>
            <th scope="col">Action</th>
          </tr> 
        </thead>
        <tbody>
        {productsData &&
              productsData.map((data, index) => (
                <tr key={index}>
                  {/* Display the data from products */}
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.bill}</td>
                  <td>{data.email}</td>
                  <td>{data.number}</td>
                  <td>{data.date}</td>
                  <td>{data.address}</td>
                  
              <td>
                <button
                  className="rounded-2 border-0 bg-primary text-light"
                //   onClick={() => Edit(index)}
                >
                  Edit
                </button>
                <button
                  className="rounded-2  border-0 bg-danger text-light mx-1"
                //   onClick={() => Delete(index)}
                >
                  Delete
                </button>
                <button
            type="submit"
            className="rounded-2 fw-bold text-dark border-0  bg-warning"
            // onClick={() => View(data)}
          >
            View
          </button>
              </td>
            </tr>
         ))} 
        </tbody>
      </table>
    </div>
  

    </div>
  )
}
