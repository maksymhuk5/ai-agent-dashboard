import { LANGUAGE_CHANGE } from "../actions/language";

const initialState = {
    language: 'en'
};

export default function languageReducer(state = initialState, action: any) {
    switch (action.type) {
        case LANGUAGE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}