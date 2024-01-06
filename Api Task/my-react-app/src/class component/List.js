import axios from "axios";
import React, { Component } from "react";
import { Api_url } from "../api/Url";
import { useNavigate, useParams } from "react-router-dom";

export const  withNavigation = (Class ) => {
  return props => <Class {...props} navigate={useNavigate()} />;
} 


  class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }
  componentDidMount() {
    this.callApi();
    console.log(this.state);
  }

  callApi = async () => {
    try {
      const res = await axios.get(Api_url);
      console.log(res);
      this.setState({ array: res.data });
    } catch (error) {
      console.error(error);
    }
  };
  edit = (id) => {
    this.props.navigate(`/classform/${id}`);
  };

  Delete = async (index, id) => {
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
   

    return (
      <div>
        {this.props.props}
        <div className="tableform container mt-5">
          <table className="table table-bordered ">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email Id</th>
                <th>Employee id</th>
                <th>Join Date</th>
                <th>Attendance</th>
                <th>Job</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* {this.state.array.map((data, index) => (
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
                      className=" btn btn-danger rounded-2 "
                     
                    >
                      Edit
                    </button>
                    <button
                      type="submit"
                      className=" btn btn-danger rounded-2 "
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))} */}
               {this.state.array.map((data, index) => {
                return <tr key={index}>
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
                      onClick={() => this.edit(data.id)}
                    >
                      Edit
                    </button>{" "}
                    <button
                      type="submit"
                      className=" btn btn-danger rounded-2 "
                      onClick={() => this.Delete(index, data.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
export default withNavigation(List)
