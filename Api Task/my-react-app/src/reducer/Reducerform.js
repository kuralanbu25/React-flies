import React, { useReducer } from "react";
import { useState } from "react";
import Reducer, { initialState } from "./Reducer";
import {GETAPIERROR,GETAPISUCCESS,POSTERROR, PUTERROR,PUTSUCCESS} from "./Action";
import { POSTSUCCESS } from "./Action";
import { getApiData, postData, putData } from "../api/Url";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const Reducerform = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const { id } = useParams();
  console.log(id);

  const nav = useNavigate();
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
    const val = await validation();
    console.log(val);
    if (val) {
      if (id) {
        await edit(id, object);
      } else {
        await post(object);
      }
    } else {
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
      return false;
    }
    return true;
  };
  const post = async () => {
    try {
      const resp = await postData(object);
      console.log(resp);
      if (resp.status === 200 || resp.status === 201) {
        dispatch(POSTSUCCESS(object));
        nav("/rlist");
      }
    } catch (error) {
      dispatch(POSTERROR(error));
    }
  };
  const edit = async () => {
    try {
      const resp = await putData(id, object);
      console.log(resp);
      if (resp.status === 200 || resp.status === 201) {
        dispatch(PUTSUCCESS(object));
        nav("/rlist");
      }
    } catch (error) {
      dispatch(PUTERROR(error));
    }
  };
  useEffect(() => {
    const get = async () => {
      try {
        const resp = await getApiData(id);
        if (resp.status === 200 || resp.status === 201) {
          dispatch(GETAPISUCCESS(resp.data));
          setObject(resp.data);
        }
      } catch (error) {
        dispatch(GETAPIERROR(error));
      }
    };
    get();
  }, [id]);

  const attendradio = (e) => {
    const value = e.target.value;
    setObject({ ...object, Attendance: value });
  };
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
            <input
              className="form-control"
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
            <input
              className="form-control"
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
            <input
              className="form-control"
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
            <button type="submit" className="btn btn-info sub" onClick={submit}>
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
