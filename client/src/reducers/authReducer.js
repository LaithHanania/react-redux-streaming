import {SIGN_IN, SIGN_OUT} from '../actions/types';


//Creating an initializer to initialize our state with props that are null
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
}

//The return {...state} means that return the whole state property as in
//and the {...state, isSignedIn: true/false} means return the state as is but update the isSignedIn prop to true/false
export default (state=INITIAL_STATE,action)=>{
    switch(action.type){
        case SIGN_IN:
            return  {...state, isSignedIn: true, userId: action.payload}
        case SIGN_OUT:
            return {...state, isSignedIn: false, userId: null}
        default:
            return state;
    }
}