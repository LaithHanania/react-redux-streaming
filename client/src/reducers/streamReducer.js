import _ from 'lodash';

//Importing types
import {
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

//Defaulting state to be an empty object
export default (state={}, action) =>{
    switch(action.type){
        case FETCH_STREAMS:
            //what the following does is creates a new object, taking all the current record in our state object and adding them in,
            //then calling mapKeys which takes the list of streams and create an object out of it using mapKeys, and the keys inside of the object
            //are the ids of the individual streams themselves, and we do that by the second argument "id" since mapKEys works
            //in such a way that itll look for the "id" prop in each stream and make that id a key for each object within the total larger object
            return {...state, ..._.mapKeys(action.payload, "id")}
        case FETCH_STREAM:
            //what the following statement does is return a new object with all the same things as the previous state object
            //but also finds the key with the action.payload.id ID and gives it a value of action.payload
            //its identical to doing:
            /*
                const newState={...state};
                newState[action.payload.id] = action.payload;
                return newState;
            */
           //so in summary, everytime we get an action with type FETCH_STREAM:
           //we take our state object, we take all our properties or key value pairs out of it and add it to the new object
           //and then dynamically add a new keyvalue pair on the fly with the key of action.payload.id and value of action.payload
            return {...state, [action.payload.id]: action.payload}
        case CREATE_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case EDIT_STREAM:
            return {...state, [action.payload.id]: action.payload};
        case DELETE_STREAM:
            //the omit function takes two arguments, the first is the object and the second is the key you want omitted / deleted
            return _.omit(state, action.payload);
        default:
            return state;
    }
}