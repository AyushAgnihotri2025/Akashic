import {
  ADMIN_LOGIN,
  UPDATE_ADMIN,
  ADD_ADMIN,
  ADD_DEPARTMENT,
  ADD_FACULTY,
  GET_ALL_FACULTY,
  ADD_SUBJECT,
  ADD_STUDENT,
  GET_ALL_STUDENT,
  GET_ADMIN,
  GET_FACULTY,
  GET_SUBJECT,
  GET_STUDENT,
  GET_ALL_ADMIN,
  GET_ALL_DEPARTMENT,
  SET_ERRORS,
  UPDATE_PASSWORD,
  GET_ALL_SUBJECT,
  DELETE_ADMIN,
  DELETE_DEPARTMENT,
  DELETE_FACULTY,
  DELETE_STUDENT,
  DELETE_SUBJECT,
  CREATE_NOTICE,
  GET_NOTICE,
  DELETE_NOTICE,
} from "../actionTypes";
import * as api from "../api";

export const adminSignIn = (formData, navigate) => async (dispatch) => {
    api.adminSignIn(formData).then((data) => {
        if (data.success) {
            dispatch({ type: ADMIN_LOGIN, data });
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

export const adminUpdatePassword = (formData, navigate) => async (dispatch) => {
    api.adminUpdatePassword(formData).then((data) => {
        if (data.success) {
            dispatch({ type: UPDATE_PASSWORD, payload: true });
            alert("Password Updated");
            navigate("/admin/home");
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const getAllStudent = () => async (dispatch) => {
    api.getAllStudent().then((data) => {
        dispatch({ type: GET_ALL_STUDENT, payload: data.result });
    });
};

export const getAllFaculty = () => async (dispatch) => {
    api.getAllFaculty().then((data) => {
        dispatch({ type: GET_ALL_FACULTY, payload: data.result });
    });
};

export const getAllAdmin = () => async (dispatch) => {
    api.getAllAdmin().then((data) => {
        dispatch({ type: GET_ALL_ADMIN, payload: data.result }); 
    });
};

export const getAllDepartment = () => async (dispatch) => {
    api.getAllDepartment().then((data) => {
        dispatch({ type: GET_ALL_DEPARTMENT, payload: data.result });
    });
};

export const getAllSubject = () => async (dispatch) => {
    api.getAllSubject().then((data) => {
        dispatch({ type: GET_ALL_SUBJECT, payload: data.result });
    });
};

export const updateAdmin = (formData) => async (dispatch) => {
    api.updateAdmin(formData).then((data) => {
        if (data.success) {
            dispatch({ type: UPDATE_ADMIN, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const addAdmin = (formData) => async (dispatch) => {
    api.addAdmin(formData).then((data) => {
        if (data.success) {
            alert("Admin Added Successfully");
            dispatch({ type: ADD_ADMIN, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const createNotice = (formData) => async (dispatch) => {
    api.createNotice(formData).then((data) => {
        if (data.success) {
            alert("Notice Created Successfully");
            dispatch({ type: CREATE_NOTICE, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};
export const getAdmin = (formData) => async (dispatch) => {
    api.getAdmin(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_ADMIN, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};
export const deleteAdmin = (formData) => async (dispatch) => {
    api.deleteAdmin(formData).then((data) => {
        if (data.success) {
            alert("Admin Deleted");
            dispatch({ type: DELETE_ADMIN, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const deleteFaculty = (formData) => async (dispatch) => {
    api.deleteFaculty(formData).then((data) => {
        if (data.success) {
            alert(data['message']);
            dispatch({ type: DELETE_FACULTY, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const deleteStudent = (formData) => async (dispatch) => {
    api.deleteStudent(formData).then((data) => {
        if (data.success) {
            alert(data['message']);
            dispatch({ type: DELETE_STUDENT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const deleteSubject = (formData) => async (dispatch) => {
    api.deleteSubject(formData).then((data) => {
        if (data.success) {
            alert("Subject Deleted");
            dispatch({ type: DELETE_SUBJECT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const deleteDepartment = (formData) => async (dispatch) => {
    api.deleteDepartment(formData).then((data) => {
        if (data.success) {
            alert("Department Deleted");
            dispatch({ type: DELETE_DEPARTMENT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const addDepartment = (formData) => async (dispatch) => {
    api.addDepartment(formData).then((data) => {
        if (data.success) {
            alert("Department Added Successfully");
            dispatch({ type: ADD_DEPARTMENT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const addFaculty = (formData) => async (dispatch) => {
    api.addFaculty(formData).then((data) => {
        if (data.success) {
            alert("Faculty Added Successfully");
            dispatch({ type: ADD_FACULTY, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const getFaculty = (department) => async (dispatch) => {
    api.getFaculty(department).then((data) => {
        if (data.success) {
            dispatch({ type: GET_FACULTY, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const addSubject = (formData) => async (dispatch) => {
    api.addSubject(formData).then((data) => {
        if (data.success) {
            alert("Subject Added Successfully");
            dispatch({ type: ADD_SUBJECT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const getSubject = (formData) => async (dispatch) => {
    api.getSubject(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_SUBJECT, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const addStudent = (formData) => async (dispatch) => {
    api.addStudent(formData).then((data) => {
        if (data.success) {
            alert("Student Added Successfully");
            dispatch({ type: ADD_STUDENT, payload: true });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const getStudent = (formData) => async (dispatch) => {
    api.getStudent(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_STUDENT, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const getNotice = (formData) => async (dispatch) => {
    api.getNotice(formData).then((data) => {
        if (data.success) {
            dispatch({ type: GET_NOTICE, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};

export const deleteNotice = (formData) => async (dispatch) => {
    api.deleteNotice(formData).then((data) => {
        if (data.success) {
            dispatch({ type: DELETE_NOTICE, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        }
    });
};