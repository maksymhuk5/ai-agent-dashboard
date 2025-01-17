import { THEME_CHANGE } from "../actions/theme";

const initialState = {
    mode: "system",
    color: "default",
    radius: "0.5rem",
};

export default function themeReducer(state = initialState, action: any) {
    switch (action.type) {
        case THEME_CHANGE:
            return { ...state, ...action.payload };
        default:
            return state;
    }
}
