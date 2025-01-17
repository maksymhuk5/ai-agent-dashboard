import { AUTH_CHANGE, COMPANY_CHANGE } from "../actions/auth";

const initialState = {
    isAuthenticated: false,
    isSuperAdmin: false,
    user: null,
    companyId: "aicallyou"
};

export default function authReducer(state = initialState, action: any) {
    switch (action.type) {
        case AUTH_CHANGE:
            return { ...state, ...action.payload };
        case COMPANY_CHANGE:
            return { ...state, companyId: action.payload };
        default:
            return state;
    }
}