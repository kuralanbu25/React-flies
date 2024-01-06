import React, { useEffect, useState } from "react";
import { addproduct, deleteRow, editRow, saveRow, selectProduct, updateQuantity } from "./redux/action/Action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const Component = () => {

  const dispatch = useDispatch();
  const products = useSelector((state) => state.Calculation.products);
 const nav = useNavigate()
  const [obj, setObj] = useState(null);
  const [list, setList] = useState([]);
  const [nonEditFlag, setNonEditFlag] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");

  const addRow = () => {
    const newProduct = {
      productName: "", 
      quantity: 0,
      amount: 0,
      totalAmount: 0,
    };
    dispatch(addproduct(newProduct));
  };



  const handleProductChange = (index, selectedProduct) => {
    dispatch(selectProduct(index, selectedProduct));
  };
  
  const handleQuantityChange = (index, quantity) => {
    dispatch(updateQuantity(index, quantity));
  };


 
  const handleSubmit = () => {
   
    setIsEditing(false); 
    nav('/rtable', { state: { productsData: [...products] } })
  };

  const productAmounts = {
    Pen: 10,
    Pencil: 5,
    Eraser: 2,
    Scale: 5,
  };
  useEffect(() => {
    console.log(obj);
    if (obj) {
      setList([...list, obj]);
    }
  }, [obj]);


  const handleSave = (index) => {
    dispatch(saveRow(index));
    setIsEditing(false); 
  };

  const handleEdit = (index) => {
    dispatch(editRow(index));
    setIsEditing(true); 
  };

  const handleDelete = (index) => {
    dispatch(deleteRow(index));
    setIsEditing(false); 
  }; 
   const handleCancel = (index) => {
    dispatch(deleteRow(index));
    setIsEditing(false); 
  };
  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <div className="form">
            <div className="row">
              <div className="col fw-bold input-data">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <div className="underline"></div>
              </div>
              <div className="col fw-bold input-data">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <div className="underline"></div>
              </div>
            </div>
            <div className="row">
              <div className="col fw-bold input-data">
                <label htmlFor="number">Phone Number</label>
                <input
                  type="text"
                  id="number"
                  className="form-control"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
                <div className="mb-2">
                </div>
                <div className="underline"></div>
              </div>
              <div className="col fw-bold input-data">
                <label htmlFor="address">Address</label>
                <div>
                  <textarea
                    id="address"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <div className="mb-2">
                  </div>
                  <div className="underline"></div>
                </div>
              </div>
              <div className="col fw-bold input-data">
                <label htmlFor="name">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-control"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
                <div className="underline"></div>
              </div>
            </div>
          </div>
        </div>

        <div className=" d-flex mt-4 container outer justify-content-end ">
          <button
            type="submit"
            // disabled={editingFlag}
            onClick={isEditing ? null : addRow} // Disable the "Add Row" button while editing
            disabled={isEditing}
            className="btn btn-success fw-bold"
            // onClick={addRow}
          >
            {" "}
            Add Row
          </button>
        </div>
        <div>
          <table className="table container outer border-1 ">
            <thead>
              <tr>
                <th scope="col">SI.NO</th>
                <th scope="col">Product Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Amount</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                  {!data.flag ? (
                    <select
                      id="productName"
                      value={data.productName}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      // onChange={(e) =>(index, e.target.value)}
                    >
                      <option value=""></option>
                      <option value="Pen">Pen</option>
                      <option value="Pencil">Pencil</option>
                      <option value="Eraser">Eraser</option>
                      <option value="Scale">Scale</option>
                    </select>
                  ) : (
                    <span>{data.productName}</span>
                  )}
                </td>

                  <td>
                    {!data.flag ? (
                      <input
                        id="quantity"
                        type="number"
                        value={data.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                              //  onChange={(e) => quantity(index, e.target.value)}
                      />
                    ) : (
                      <span>{data.quantity}</span>
                    )}
                  </td>
                  <td>
                    <input
                      type="number"
                      id=" amount"
                      value={productAmounts[data.productName]}
                      readOnly
                    />
                  </td>
                  <td>
                  <input
                    type="number"
                    id="totalAmount"
                    value={data.quantity * productAmounts[data.productName]}
                    readOnly
                  />

                  </td>

                  <td>
                  {!data.flag ? (
                    <button
                      type="submit"
                      className="bg-primary rounded text-light"
                      onClick={() => handleSave(index)}                    >
                      Save
                    </button>
                  ) : (

                      <button
                      type="submit"
                      className="bg-primary rounded text-light"
                      onClick={() => handleEdit(index)}
                        disabled={nonEditFlag}
                    >
                      Edit
                    </button>
                  )}
                  {!data.flag ? (
                    <button
                      type="submit"
                      
                      className="bg-danger rounded text-light mx-2"
                      onClick={() => handleCancel(index)}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-danger rounded text-light mx-2"
                      onClick={() => handleDelete(index)}
                        disabled={nonEditFlag}
                    >
                      Delete
                    </button>

                     )} 
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-5">
          {/* <p className="fw-bold text-light">Grand Total: {grandTotal}</p> */}
          <div className="d-flex justify-content-center mb-5">
            <button
              type="submit"
              className="rounded fw-bold text-dark border-0 btn btn-warning"
              // onClick={Clear}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded fw-bold text-light border-0 btn btn-primary mx-2"
              onClick={handleSubmit}
              disabled={isEditing}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};




  // const [products, setProducts] = useState([])
  // const [row, setrow] = useState([]);
  // const [id, setId] = useState(null);
  // const [view, setView] = useState(null);

 // const [nameerr, setNameerr] = useState("");
  // const [emailerr, setEmailerr] = useState("");
  // const [numbererr, setNumbererr] = useState("");
  // const [addresserr, setAddresserr] = useState("");
  // const [dateerr, SetDateerr] = useState("");
  // const dispatch = useDispatch();
    // const [bill, setBill] = useState("");
  // const [editrows, seteditrows] = useState([]);
  // const [grandTotal, setGrandTotal] = useState(0);
  // const [counter, setCounter] = useState(1);
  // const [flag, setflag] = useState(false);
    // const handleProductChange = (index, selectedProduct) => {
  //   dispatch(selectedProduct(index, selectedProduct));
  // };
 // const addRow = () => {
  //   setProducts([...products, { productName: "", quantity: 0, amount: 0, totalAmount: 0 }]);

  // };
  