import {
  SET_ERRORS,
  FACULTY_LOGIN,
  UPDATE_PASSWORD,
  UPDATE_FACULTY,
  ADD_TEST,
  GET_TEST,
  GET_STUDENT,
  MARKS_UPLOADED,
  ATTENDANCE_MARKED,
  GET_ALL_TEST,
} from "../actionTypes";
import * as api from "../api";

export const facultySignIn = (formData, navigate) => async (dispatch) => {
    api.facultySignIn(formData).then((data) => {
        if (data.success) {
            dispatch({ type: FACULTY_LOGIN, data });
            if (data.result.passwordUpdated) {
                window.location.replace(`/${data.result.position.toLowerCase()}/home`);
            } else {
                window.location.replace(`/${data.result.position.toLowerCase()}/update/password`);
            };
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const facultyUpdatePassword = (formData, navigate) => async (dispatch) => {
    api.facultyUpdatePassword(formData).then((data) => {
        if (data.success) {
          dispatch({ type: UPDATE_PASSWORD, payload: true });
          alert("Password Updated");
          navigate("/faculty/home");
        } else {
          dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const updateFaculty = (formData) => async (dispatch) => {
  api.updateFaculty(formData).then((data) => {
        if (data.success) {
            dispatch({ type: UPDATE_FACULTY, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const createTest = (formData) => async (dispatch) => {
  api.createTest(formData).then((data) => {
        if (data.success) {
            alert("Test Created Successfully");
            dispatch({ type: ADD_TEST, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const getTest = (formData) => async (dispatch) => {
    api.getTest(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_TEST, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const getAllTest = (formData) => async (dispatch) => {
    api.getAllTest(formData).then((data) => {
        dispatch({ type: GET_ALL_TEST, payload: data.result });
    });
};

export const getStudent = (formData) => async (dispatch) => {
    api.getStudent(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_STUDENT, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const uploadMark =
  (marks, department, section, year, test) => async (dispatch) => {
    const formData = {
        marks,
        department,
        section,
        year,
        test,
    };
    api.uploadMarks(formData).then((data) => {
        if (data.success) {
            alert("Marks Uploaded Successfully");
            dispatch({ type: MARKS_UPLOADED, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
  };

export const markAttendance =
  (checkedValue, subjectName, department, year, section) =>
  async (dispatch) => {
    const formData = {
        selectedStudents: checkedValue,
        subjectName,
        department,
        year,
        section,
    };
    api.markAttendance(formData).then((data) => {
        if (data.success) {
          alert("Attendance Marked Successfully");
          dispatch({ type: ATTENDANCE_MARKED, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
  };
