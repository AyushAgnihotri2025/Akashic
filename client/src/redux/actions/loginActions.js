import {
    SET_ERRORS,
    SMART_LOGIN,
    VERIFY_SECURITY_PIN,
} from "../actionTypes";
import * as api from "../api";

export const smartSignInPinVerify = (formData) => async (dispatch) => {
    api.smartSignInPinVerify(formData).then((data) => {
        if (data.success) {
            dispatch({ type: VERIFY_SECURITY_PIN, payload: data });
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};

export const smartSignIn = (formData, navigate) => async (dispatch) => {
    api.smartSignIn(formData).then((data) => {
        if (data.success) {
            dispatch({ type: SMART_LOGIN, payload: data });
            if (data.result.passwordUpdated) {
                window.location.replace(`/${data.result.position.toLowerCase()}/home`);
            } else {
                window.location.replace(`/${data.result.position.toLowerCase()}/update/password`);
            }
        } else {
            dispatch({ type: SET_ERRORS, payload: data });
        };
    });
};