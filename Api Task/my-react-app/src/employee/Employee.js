import React, { useEffect, useState } from "react";
import { Api_url } from "../api/Url";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const Employee = () => {
  let nav = useNavigate();
  const { id } = useParams();
  console.log(id);
  const [object, setObject] = useState({
    name: "",
    email: "",
    employeeid: "",
    date: "",
    Attendance: "",
    Job: "",
  });
  const [name_Error, setName] = useState("");
  const [email_Error, setEmail] = useState("");
  const [employeeid_Error, setEmployeeId] = useState("");
  const [date_Error, setDate] = useState("");
  const [Attendance_Error, setAttendance] = useState("");
  const [Job_Error, setjob] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    console.log(object);
    const val=await validation();
    console.log(val)
   if(val){
    if (id) {
      console.log(id);
      console.log(object);
      await edit(id, object);
      nav("/list");
    } else {
      await post(object);
      nav("/list");
    }
   }
   else{
    return;
   }

    setObject({
      name: "",
      email: "",
      employeeid: "",
      date: "",
      Attendance: "",
      Job: "",
    });
  };

  const validation = async (e) => {
    let valueError = false;

    if (object.name.length < 3) {
      setName("NAME REQUIRED");
      valueError = true;
    } else {
      setName("");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(object.email)) {
      setEmail("Email REQUIRED !");
      valueError = true;
    } else {
      setEmail("");
    }
    if (object.employeeid.length < 6) {
      setEmployeeId("Employee id REQUIRED!");
      valueError = true;
    } else {
      setEmployeeId("");
    }
    if (object.date == "") {
      setDate("Date REQUIRED!");
      valueError = true;
    } else {
      setDate("");
    }
    if (object.Attendance === "") {
      setAttendance("Attendance REQUIRED!");
      valueError = true;
    } else {
      setAttendance("");
    }
    if (object.Job == "") {
      setjob("Job REQUIRED!");
      valueError = true;
    } else {
      setjob("");
    }

    if (valueError) {
      return false
    }
    return true;
  };

  const post = async (object) => {
    const res = await axios.post(Api_url, object);
   
  };
  const edit = async (id, object) => {
    console.log(id);
    console.log(object);
    const res = await axios.put(Api_url + id, object);
  };
  useEffect(() => {
    if (id) {
      console.log(id);
      const get = async (data) => {
        console.log(data);
        const res = await axios.get(Api_url + data);
        console.log(res);
        setObject(res.data);
      };
      get(id);
    }
  }, [id]);
  const attendradio = (e) => {
    const value = e.target.value;
    setObject({ ...object, Attendance: value });
  };



  return (
    <div>
      <div  className="formpage">
        <form>
          <h3 className="text-center">Employee Form</h3>
          <div>
            <label htmlFor="name">Name</label>
            <input className="form-control"
              type="text"
              id="name"
              value={object.name}
              onChange={(e) => {
                setObject({ ...object, name: e.target.value });
                setName("");
              }}
            ></input>
            <p id="name_err" className="text-warning fw-bold ">
              {name_Error}
            </p>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input className="form-control"
              type="email"
              id="email"
              value={object.email}
              onChange={(e) => {
                setObject({ ...object, email: e.target.value });
                setEmail("");
              }}
            ></input>
            <p id="email_err" className="text-warning fw-bold ">
              {email_Error}
            </p>
          </div>
          <div>
            <label htmlFor="employeeid">Employee ID</label>
            <input className="form-control"
              type="number"
              id="employeeid"
              value={object.employeeid}
              onChange={(e) => {
                setObject({ ...object, employeeid: e.target.value });
                setEmployeeId("");
              }}
            ></input>
            <p id="employeeid" className="text-warning fw-bold ">
              {employeeid_Error}
            </p>
          </div>
          <div>
            <label htmlFor="date">Join Date</label>
            <input className="form-control"
              type="date"
              id="date"
              value={object.date}
              onChange={(e) => {
                setObject({ ...object, date: e.target.value });
                setDate("");
              }}
            ></input>
            <p id="date_err" className="text-warning fw-bold ">
              {date_Error}
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
              checked={object.Attendance === "Present"}
              onChange={attendradio}
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
              checked={object.Attendance === "Absent"}
              onChange={attendradio}
            ></input>
            <label className="out" htmlFor="out">
              Out
            </label>
            <p id="Attendance_err" className="text-warning fw-bold ">
              {Attendance_Error}
            </p>
          </div>
          <div>
            <label htmlFor="Job">Job</label>
            <select
              className="select form-control"
              id="Job"
              value={object.Job}
              onChange={(e) => {
                setObject({ ...object, Job: e.target.value });
                setjob("");
              }}
            >
              <option value="">Select</option>
              <option value="Manager">Manager</option>
              <option value="Worker">Worker</option>
            </select>
            <p id="Job_err" className="text-warning fw-bold ">
              {Job_Error}
            </p>
          </div>
          <div>
            <button type="submit" className="btn btn-info sub" onClick={submit}>submit</button>
          </div>
          
        </form>
      </div>
    </div>
  );
};
