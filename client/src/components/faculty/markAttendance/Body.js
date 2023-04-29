import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import {
  getStudent,
  markAttendance,
} from "../../../redux/actions/facultyActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { ATTENDANCE_MARKED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";
import { getSubject } from "../../../redux/actions/adminActions";
import {decrypt} from "../../../redux/encryption";

const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(decrypt(localStorage.getItem("user")));
  const departments = useSelector((state) => state.admin.allDepartment);
  const subjects = useSelector((state) => state.admin.subjects.result);

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [subjectName, setSubjectName] = useState("");
  const [checkedValue, setCheckedValue] = useState([]);

  const [value, setValue] = useState({
    department: user.result.department,
    year: "",
    section: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setValue({ department: user.result.department, year: "", section: "" });
    }
  }, [store.errors]);

  const handleInputChange = (e) => {
    const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
    dispatch(getSubject({ department: user.result.department, year: value.year }));
  };
  const students = useSelector((state) => state.admin.students.result);

  const uploadAttendance = (e) => {
    setError({});
    dispatch(
      markAttendance(
        checkedValue,
        subjectName,
        user.result.department,
        value.year,
        value.section
      )
    );
  };

  useEffect(() => {
    if (store.errors || store.faculty.attendanceUploaded) {
      setLoading(false);
      if (store.faculty.attendanceUploaded) {
        setValue({ department: user.result.department, year: "", section: "" });
        setSearch(false);
        setSubjectName("");
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ATTENDANCE_MARKED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.attendanceUploaded]);

  useEffect(() => {
    if (store.faculty.attendanceUploaded) {
      setValue({ department: "", year: "", section: "" });
    }
  }, [store.faculty.attendanceUploaded]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [students]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 tablet:custom-added-8 mobile:custom-added-8 mobile:flex-[1] tablet:flex-[1] tablet:custom-added-8">
      <div className="space-y-5 mobile:custom-added-7 tablet:custom-added-7">
        <div className="flex text-gray-400 items-center space-x-2 2xl:custom-added-15 desktop:custom-added-15 laptop:custom-added-15 mobile:ml-2 tablet:ml-2 ">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]  laptop:custom-added-2 laptop:custom-added-13 2xl:custom-added-13 desktop:custom-added-13 mobile:custom-added-2 laptop:pl-0 mobile:custom-added-9 mobile:pl-0 mobile:h-[44.375rem] tablet:custom-added-9 tablet:custom-added-2 tablet:pl-0 tablet:h-[44.75rem]">
          <form
            className="flex flex-col space-y-2 col-span-1 laptop:custom-added-9 mobile:custom-added-9 tablet:custom-added-9"
            onSubmit={handleSubmit}>
            <label htmlFor="department">Department</label>
            <Select
              required
              disabled
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              >
              <MenuItem value="">{user.result.department}</MenuItem>
              {departments?.map((dp, idx) => (
                <MenuItem key={idx} value={dp.department}>
                  {dp.department}
                </MenuItem>
              ))}
            </Select>
            <label htmlFor="year">Year</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.year}
              onChange={(e) => setValue({ ...value, year: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
              <MenuItem value="4">4</MenuItem>
            </Select>
            <label htmlFor="section">Section</label>
            <Select
              required
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.section}
              onChange={(e) => setValue({ ...value, section: e.target.value })}>
              <MenuItem value="">None</MenuItem>
              <MenuItem value="1">1</MenuItem>
              <MenuItem value="2">2</MenuItem>
              <MenuItem value="3">3</MenuItem>
            </Select>

            <button
              className={`${classes.adminFormSubmitButton} w-56`}
              type="submit">
              Search
            </button>
          </form>
          <div className="col-span-3 mr-6 laptop:custom-added-9 mobile:flex mobile:custom-added-11 custom-added-14 tablet:flex tablet:custom-added-11">
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Loading"
                  height={50}
                  width={150}
                  color="#111111"
                  messageColor="blue"
                />
              )}
              {(error.noStudentError || error.backendError) && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noStudentError || error.backendError}
                </p>
              )}
            </div>
            {search &&
              !loading &&
              Object.keys(error).length === 0 &&
              students?.length !== 0 && (
                <div className={`${classes.adminData} h-[20rem]`}>
                  <div className="grid grid-cols-7">
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Select
                    </h1>
                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Sr no.
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Name
                    </h1>
                    <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                      Username
                    </h1>

                    <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                      Section
                    </h1>
                  </div>
                  {students?.map((stu, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-7`}>
                      <input
                        onChange={handleInputChange}
                        value={stu._id}
                        className="col-span-1 border-2 w-16 h-4 mt-3 px-2 "
                        type="checkbox"
                      />
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {stu.name}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {stu.username}
                      </h1>

                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {stu.section}
                      </h1>
                    </div>
                  ))}
                </div>
              )}
            {search && Object.keys(error).length === 0 && (
              <div className="space-x-3 flex items-center justify-center mt-5">
                <label className="font-bold text-lg">Subject</label>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36, width: 224 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}>
                  <MenuItem value="">None</MenuItem>
                  {subjects?.map((dp, idx) => (
                    <MenuItem key={idx} value={dp.subjectName}>
                      {dp.subjectName}
                    </MenuItem>
                  ))}
                </Select>
                <button
                  onClick={uploadAttendance}
                  className={`${classes.adminFormSubmitButton} bg-blue-500`}>
                  Mark
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
