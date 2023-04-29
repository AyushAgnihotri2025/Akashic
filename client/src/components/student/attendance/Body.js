import React, { useEffect, useState } from "react";
import "../../../assets/stylesheets/table.scss";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import { getSubject } from "../../../redux/actions/adminActions";
import { MenuItem, Select } from "@mui/material";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";

const Body = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const attendance = useSelector((state) => state.student.attendance.result);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const subjects = useSelector((state) => state.admin.subjects.result);

  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 tablet:custom-added-8 mobile:custom-added-8 mobile:flex-[1] tablet:flex-[1] tablet:custom-added-8">
      <div className="space-y-5 mobile:custom-added-7 tablet:custom-added-7">
        <div className="flex text-gray-400 items-center space-x-2 2xl:custom-added-15 desktop:custom-added-15 laptop:custom-added-15 mobile:ml-2 tablet:ml-2 ">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
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
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError}
                </p>
              )}
            </div>
            {!loading &&
              Object.keys(error).length === 0 &&
              subjects?.length !== 0 && (
                <ol className={`${classes.adminData} custom-added-10 collection collection-container text-alignment`}>
                  <li className="item item-container">
                    <div className="attribute" data-name="Sr no.">
                      Sr no.
                    </div>
                    <div className="attribute" data-name="Subject Code">
                      Subject Code
                    </div>
                    <div className="attribute" data-name="Subject Name">
                      Subject Name
                    </div>
                    <div className="attribute" data-name="Attended">
                      Attended
                    </div>
                    <div className="attribute" data-name="Total">
                      Total
                    </div>
                    <div className="attribute" data-name="Percentage">
                      Percentage
                    </div>
                  </li>
                  {attendance?.map((res, idx) => (
                    <li
                    key={idx}
                    className="item item-container laptop:hover:scale-105 laptop:transition-all duration-150">
                      <div className="attribute" data-name="Sr no.">
                        {idx + 1}
                      </div>
                      <div className="attribute" data-name="Subject Code">
                        {res.subjectCode}
                      </div>
                      <div className="attribute" data-name="Subject Name">
                        {res.subjectName}
                      </div>
                      <div className="attribute" data-name="Attended">
                        {res.attended}
                      </div>
                      <div className="attribute" data-name="Total">
                        {res.total}
                      </div>
                      <div className="attribute" data-name="Percentage">
                        {res.percentage}
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
