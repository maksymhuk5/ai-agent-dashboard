
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

// const composeEnhancers = compose;

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('rootState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('rootState', serializedState);
  } catch (err) {
    // Handle write errors
    console.log('Error saving state:', err);
  }
};

export const store = createStore(
  rootReducer,
  loadState(), // Load initial state from localStorage
  // composeEnhancers(applyMiddleware(thunk as any))
);

// Subscribe to store changes to save state
store.subscribe(() => {
  saveState(store.getState());
});