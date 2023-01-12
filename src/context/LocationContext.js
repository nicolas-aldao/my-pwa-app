import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      //console.log('EN FUNCION: ' + JSON.stringify(action.payload[0]));
      return { ...state, currentLocation: action.payload };
    case 'start_recording':
      return { ...state, recording: true };
    case 'stop_recording':
      return { ...state, recording: false };
    case 'add_location':
      //console.log('locations in reducer: ' + JSON.stringify(state.locations));
      //console.log("🚀 ~ file: LocationContext.js:18 ~ locationReducer ~ action.payload[0]", action.payload)
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case 'change_name':
      return { ...state, name: action.payload };
    case 'reset':
      return { ...state, name: '', locations: [] };
    case 'show_state':
      console.log('current state ' + state);
      return;
    default:
      return state;
  }
};

const changeName = dispatch => name => {
  dispatch({ type: 'change_name', payload: name });
};
const startRecording = dispatch => () => {
  dispatch({ type: 'start_recording' });
};
const stopRecording = dispatch => () => {
  dispatch({ type: 'stop_recording' });
};
const addLocation = dispatch => (location, recording) => {
  console.log(
    '🚀 ~ file: LocationContext.js:41 ~ addLocation ~ location',
    location,
  );

  dispatch({ type: 'add_current_location', payload: location });
  if (recording) {
    dispatch({ type: 'add_location', payload: location });
  }

  //dispatch({ type: 'show_state' });
};
const reset = dispatch => () => {
  dispatch({ type: 'reset' });
};

export const { Context, Provider } = createDataContext(
  locationReducer,
  { startRecording, stopRecording, addLocation, changeName, reset },
  { name: '', recording: false, locations: [], currentLocation: null },
);
