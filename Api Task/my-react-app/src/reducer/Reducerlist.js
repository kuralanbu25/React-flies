import React, {  useEffect, useReducer  } from 'react'
import  Reducer, { initialState } from './Reducer';
import {  deleteData, getData } from '../api/Url';
import { DELETEERROR, DELETESUCCESS, GETERROR, GETSUCCESS} from './Action';
import { useNavigate } from 'react-router-dom';


export const Reducerlist = () => {
const[state,dispatch]=useReducer(Reducer,initialState)
const nav=useNavigate()

const callApi = async () => {
 try {
   const resp = await getData();

   if (resp.status === 200 || resp.status === 201) {
    dispatch(GETSUCCESS(resp.data));

   }

 } catch (error) {
   dispatch(GETERROR(error));
 }
 }
  
  useEffect(() => {
    callApi();
  }, []);

  const edit =  (id) => {
    nav(`/rform/${id}`);
  };
  const Delete=async(id)=>{
    try {
      const resp = await deleteData(id);
      if (resp.status === 200 || resp.status === 201) {
       dispatch(DELETESUCCESS(id));
   
      }
   
    } catch (error) {
      dispatch(DELETEERROR(error));
    }
  }
  return (
    <div className="tableform container mt-5">
         <table className="table table-bordered ">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email Id</th>
                <th scope="col">Employee id</th>
                <th scope="col">Join Date</th>
                <th scope="col">Attendance</th>
                <th scope="col">Job</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
            {state.item.map((data, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.employeeid}</td>
                  <td>{data.date}</td>
                  <td>{data.Attendance}</td>
                  <td>{data.Job}</td>
                  <td>
                    <button
                      type="submit"
                      className=" btn btn-info rounded-2 " 
                       onClick={()=>edit(data.id)}
                    >
                      Edit
                    </button>{' '}
                    <button
                      type="submit"
                      className=" btn btn-danger rounded-2 "
                      onClick={()=>Delete(data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
               ))}
            </tbody>
            </table>
    </div>
  )
}

