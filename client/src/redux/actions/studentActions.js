import {
  SET_ERRORS,
  UPDATE_PASSWORD,
  TEST_RESULT,
  STUDENT_LOGIN,
  ATTENDANCE,
  UPDATE_STUDENT,
  GET_SUBJECT,
} from "../actionTypes";
import * as api from "../api";

export const studentSignIn = (formData, navigate) => async (dispatch) => {
    api.studentSignIn(formData).then((data) => {
        if (data.success) {
            dispatch({ type: STUDENT_LOGIN, data });
            if (data.result.passwordUpdated) {
                window.location.replace(`/${data.result.position.toLowerCase()}/home`);
            } else {
                window.location.replace(`/${data.result.position.toLowerCase()}/update/password`);
            };
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const studentUpdatePassword =
  (formData, navigate) => async (dispatch) => {
    api.studentUpdatePassword(formData).then((data) => {
        if (data.success) {
          dispatch({ type: UPDATE_PASSWORD, payload: true });
          alert("Password Updated");
          navigate("/student/home");
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
  };

export const updateStudent = (formData) => async (dispatch) => {
    api.updateStudent(formData).then((data) => {
        if (data.success) {
            dispatch({ type: UPDATE_STUDENT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const getSubject = (department, year) => async (dispatch) => {
    const formData = {
      department,
      year,
    };
    api.getSubject(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_SUBJECT, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const getTestResult =
  (department, year, section) => async (dispatch) => {
    const formData = {
        department,
        year,
        section,
    };
    api.getTestResult(formData).then((data) => {
        if (data.success) {
          dispatch({ type: TEST_RESULT, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
  };

export const getAttendance =
  (department, year, section) => async (dispatch) => {
    const formData = {
        department,
        year,
        section,
    };
    api.getAttendance(formData).then((data) => {
        if (data.success) {
            dispatch({ type: ATTENDANCE, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
  };
