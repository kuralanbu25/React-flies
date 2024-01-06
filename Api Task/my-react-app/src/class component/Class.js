import React, { Component } from "react";
import { Api_url } from "../api/Url";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const withRouter = WrappedComponent => props => {
  const params = useParams();
  return (
    <WrappedComponent
      {...props}
      params={params.id}
      navigate={useNavigate()}
    />
  );
};

  class Class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      object: {
        name: "",
        email: "",
        employeeid: "",
        date: "",
        Attendance: "",
        Job: "",
      },
      name_Error: "",
      email_Error: "",
      employeeid_Error: "",
      date_Error: "",
      Attendance_Error: "",
      Job_Error: "",
    };
  }
   submit=async(e)=> {
    e.preventDefault();
    const {object}=this.state;
    console.log(object);
    const val = await this.validation();
    console.log(val);
    if (val) {
      // const {id}=this.params
      if (this.props.params) {
        await this.edit(this.props.params, this.state.object);
        // await this.edit(id, object);
      } else {
        await this.Post(this.state.object);
        // await this.post(object);
      }
    } else {
      return;
    }
    this.setState({
      object: {
        name: "",
        email: "",
        employeeid: "",
        date: "",
        Attendance: "",
        Job: "",
      },
    });
  }
   validation=async()=> {
    let valueError = false;
   const {object}=this.state;
    if (object.name.length < 3) {
      this.setState({ name_Error: "NAME REQUIRED" });
      valueError = true;
    } else {
      this.setState({ name_Error: "" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(object.email)) {
      this.setState({ email_Error: "Email REQUIRED !" });
      valueError = true;
    } else {
      this.setState({ email_Error: "" });
    }
    if (object.employeeid.length < 6) {
      this.setState({ employeeid_Error: "Employee id REQUIRED!" });
      valueError = true;
    } else {
      this.setState({ employeeid_Error: "" });
    }
    if (object.date === "") {
      this.setState({ date_Error: "Date REQUIRED!" });
      valueError = true;
    } else {
      this.setState({ date_Error: "" });
    }
    if (object.Attendance === "") {
      this.setState({ Attendance_Error: "Attendance REQUIRED!" });
      valueError = true;
    } else {
      this.setState({ Attendance_Error: "" });
    }
    if (object.Job === "") {
      this.setState({ Job_Error: "Job REQUIRED!" });
      valueError = true;
    } else {
      this.setState({ Job_Error: "" });
    }
    if (valueError) {
      return false;
    }
    return true;
  }

  async Post(object){
    const res = await axios.post(Api_url, object)
    this.props.navigate(`/clist`)
  }

  async edit(id, object) {
    console.log(id);
    console.log(object);
    const res = await axios.put(Api_url + id, object);
    this.props.navigate('/clist');

  }

  async componentDidMount() {
    if (this.props.params) {
      // console.log(this.props.id);
      const getItem = async (data) => {
        console.log(data);
        const res = await axios.get(Api_url + data);
        console.log(res);
        // this.setState(res.data );
        this.setState({
          object: { ...this.state.object, ...res.data },
      });

      };
      getItem(this.props.params);
    }
  }

  attendradio=(e)=> {
    const value = e.target.value;
    this.setState({
      object: {
        ...this.state.object,
        Attendance: value,
      },
    });
  }
  render() {
    // const {object}=this.state;
    return (
      <div>
        <div className="formpage">
          <form>
            <h3 className="text-center">Employee Form</h3>
            <div>
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="text"
                id="name"
                value={this.state.object.name}
                onChange={(e) => {
                  this.setState({
                    object:{...this.state.object, name: e.target.value}  });
                  this.setState({ name_Error: "" });
             }}
              ></input>
              <p id="name_err" className="text-warning fw-bold ">
                {this.state.name_Error}
              </p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                id="email"
                value={this.state.object.email}
                onChange={(e) => {
                  this.setState({
                    object:{...this.state.object, email: e.target.value}  });
                  this.setState({ email_Error: "" });
             }}
              ></input>
              <p id="email_err" className="text-warning fw-bold ">
                {this.state.email_Error}
              </p>
            </div>
            <div>
              <label htmlFor="employeeid">Employee ID</label>
              <input
                className="form-control"
                type="number"
                id="employeeid"
                value={this.state.object.employeeid}
                onChange={(e) => {
                  this.setState({
                    object:{...this.state.object, employeeid: e.target.value}  });
                  this.setState({ employeeid_Error: "" });
             }}
              ></input>
              <p id="employeeid" className="text-warning fw-bold ">
                {this.state.employeeid_Error}
              </p>
            </div>
            <div>
              <label htmlFor="date">Join Date</label>
              <input
                className="form-control"
                type="date"
                id="date"
                value={this.state.object.date}
                onChange={(e) => {
                  this.setState({
                    object:{...this.state.object, date: e.target.value}  });
                  this.setState({ date_Error: "" });
             }}
              ></input>
              <p id="date_err" className="text-warning fw-bold ">
                {this.state.date_Error}
              </p>
            </div>
            <div>
              <label>Attendance</label>
              <br></br>
              <input
                type="radio"
                className="in"
                id="in"
                name="Attendance"
                value="Present"
                checked={this.state.object.Attendance === "Present"}
                onChange={this.attendradio}
              ></input>
              <label className="out" htmlFor="in">
                In
              </label>
              <input
                type="radio"
                className="in"
                id="in"
                name="Attendance"
                value="Absent"
                checked={this.state.object.Attendance === "Absent"}
                onChange={this.attendradio}
              ></input>
              <label className="out" htmlFor="out">
                Out
              </label>
              <p id="Attendance_err" className="text-warning fw-bold ">
                {this.state.Attendance_Error}
              </p>
            </div>
            <div>
              <label htmlFor="Job">Job</label>
              <select
                className="select form-control"
                id="Job"
                value={this.state.object.Job}
                onChange={(e) => {
                  this.setState({
                    object:{...this.state.object, Job: e.target.value}  });
                  this.setState({ Job_Error: "" });
             }}
              >
                <option value="">Select</option>
                <option value="Manager">Manager</option>
                <option value="Worker">Worker</option>
              </select>
              <p id="Job_err" className="text-warning fw-bold ">
                {this.state.Job_Error}
              </p>
            </div>
            <div>
              <button
                type="submit"
                className="btn btn-info sub"
                onClick={this.submit}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
 export default withRouter(Class)