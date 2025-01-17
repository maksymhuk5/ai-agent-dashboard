import { CHANGE_SIDEBAR_COLLAPSED } from "../actions/sidebar";

const initialState = {
    collapsed: false,
};

export default function sidebarReducer(state: any = initialState, action: any) {
    switch (action.type) {
        case CHANGE_SIDEBAR_COLLAPSED:
            return { ...state, collapsed: action.payload };
        default:
            return state;
    }
}