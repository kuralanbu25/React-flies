import axios from 'axios';
import React, { Component } from 'react'
import { Api_url } from '../api/Url';

export default class Classformlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
          array: [],
        };
      }
      componentDidMount() {
        this.callApi();
      }
    
      async callApi() {
        try {
          const res = await axios.get(Api_url);
          this.setState({ array: res.data });
        } catch (error) {
          console.error(error);
        }
      }
    
      edit = (id) => {
           this.props.nav(`/form/${id}`);
         };
    
      delete = async (index, id) => {
    try {
      await axios.delete(Api_url + id); 
      this.setState((prevState) => ({
        array: prevState.array.filter((val, i) => i !== index),
      }));
    } catch (error) {
      console.error('Delete error', error);
    }
  };
  render() {
    const {array}=this.state;
    return (
      <div>
        <div className="tableform container mt-5">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Employee id</th>
                <th> Join Date</th>
                <th>Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {array.map((data,index)=>{
               return<tr key={index}>
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
                    className=" btn btn-danger rounded-2 "
                    onClick={() => this.edit(data.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className=" btn btn-danger rounded-2 "
                    onClick={() => this.Delete(index, data.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
               })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
