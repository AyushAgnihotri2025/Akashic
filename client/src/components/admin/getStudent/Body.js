import React, { useEffect, useState } from "react";
import "../../../assets/stylesheets/table.scss";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { SET_ERRORS } from "../../../redux/actionTypes";
const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const departments = useSelector((state) => state.admin.allDepartment);
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  const [value, setValue] = useState({
    department: "",
    year: "",
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getStudent(value));
  };
  const students = useSelector((state) => state.admin.students.result);

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
              displayEmpty
              sx={{ height: 36, width: 224 }}
              inputProps={{ "aria-label": "Without label" }}
              value={value.department}
              onChange={(e) =>
                setValue({ ...value, department: e.target.value })
              }>
              <MenuItem value="">None</MenuItem>
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
                <ol className={`${classes.adminData} custom-added-10 collection collection-container text-alignment`}>
                  <li className="item item-container item-container-student">
                    <div className="attribute" data-name="Sr no.">
                      Sr no.
                    </div>
                    <div className="attribute" data-name="Name">
                      Name
                    </div>
                    <div className="attribute" data-name="Username">
                      Username
                    </div>
                    <div className="attribute" data-name="Email">
                      Email Id
                    </div>
                    <div className="attribute" data-name="Section">
                      Section
                    </div>
                    <div className="attribute-last" data-name="Batch">
                      Batch
                    </div>
                  </li>
                  {students?.map((stu, idx) => (
                    <li
                      key={idx}
                      className="item item-container item-container-student laptop:hover:scale-105 laptop:transition-all duration-150">
                      <div className="attribute" data-name="Sr no.">
                        {idx + 1}
                      </div>
                      <div className="attribute" data-name="Name">
                        {stu.name}
                      </div>
                      <div className="attribute" data-name="Username">
                        {stu.username}
                      </div>
                      <div className="attribute" data-name="Email">
                        {stu.email}
                      </div>
                      <div className="attribute" data-name="Section">
                        {stu.section}
                      </div>
                      <div className="attribute-last" data-name="Batch">
                        {stu.batch}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
