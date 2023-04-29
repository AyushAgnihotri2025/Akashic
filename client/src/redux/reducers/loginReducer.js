import { encrypt } from "../encryption";
import { VERIFY_SECURITY_PIN, SMART_LOGIN } from "../actionTypes";

const initialState = {
    data: {},
    authData: {},
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case VERIFY_SECURITY_PIN:
            return { ...state, data: action.payload };
        case SMART_LOGIN:
            localStorage.setItem("user", encrypt(JSON.stringify({ ...action?.payload })));
            return { ...state, authData: action?.payload }
        default:
            return state;
    }
};

export default loginReducer;
