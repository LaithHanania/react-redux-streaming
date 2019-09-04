//Importing redux functionality
import {combineReducers} from 'redux';

//Importing locally created reducers
import authReducer from './authReducer';
import streamReducer from './streamReducer';

//importing the built in reducer in redux-form to handle managing the redux store for forms
import {reducer as formReducer} from 'redux-form';
//we can optionally import it as:
//import {reducer as formReducer} since we have a named import it has to be reducer
//but sometimes we already have one named that so we can import the reducer as another name
//but if we dont have one thats called reducer or we dont mind naming it reducer we can just import as:
//import {reducer} from 'redux-form';

export default combineReducers({
    auth: authReducer,

    //assigning the redux-form reducer to a particular key: (must be 'form' key)
    form: formReducer,

    streams: streamReducer
});