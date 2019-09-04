//importing streams api axios instance
import streams from '../apis/streams';

//importing constants (types) from locally created file
import {
    SIGN_IN, 
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM
} from './types';

//importing history object
//we created this history object, which we can do because we're using the custom <Router> tag
import history from '../history';

//action creator for signing in of google account
export const signIn = (userId) =>{
    return({
        type: SIGN_IN,
        payload: userId
    });
}

//action creator for signing out of google account
export const signOut = () =>{
    return({
        type: SIGN_OUT
    });
}

//Action creator to create a new stream
//Receives the argument of the form values like the title and description of the stream to be created
//asynchronous action creator
export const createStream = (formValues) => async (dispatch, getState) =>{
    //destructuring the userId out of the auth object
    //the userId is the Id assigned from google for an account
    const {userId} = getState().auth;

    //making a post request with axios:
    //post requests creates a new record
    //assigning the result to a 'response' variable
    //we 'await' the process to finish before doing anything else
    //example usage of post request is: axios.post(url, {object});
    //in this case we add on '/streams' to the baseURL and pass the object of formValues and the userId added to it
    const response = await streams.post('/streams', {...formValues, userId})

    //console.log(response);

    //Dispatching the action manually because we awaited it
    //giving it the appropriate type of CREATE_STREAM and the payload of the data of the response(which is the new created
    //object of formValues plus the userId)
    //so, response.data contains: title, description (of the form), the userId and the id
    dispatch({type: CREATE_STREAM, payload: response.data});

    //do some programmatic navigation to get the user back to the root route
    //by using push() on our history object and giving the argument of the path:
    history.push('/');
};

//Action creator to fetch all the streams
//asynchronous action creator
export const fetchStreams = () => async dispatch=>{
    //making a get request with axios
    //assigning the result to a 'response' variable
    //we 'await' the process to finish before doing anything else
    //example usage of get request is: axios.get(url);
    //in this case we add on '/streams' to the baseURL
    const response = await streams.get('/streams');

    //console.log(response.data);

    //Dispatching the action manually because we awaited it
    //payload is response.data which contains an array of the stream objects that contain:
    //title, description, id and userId(if a user created the stream)
    dispatch({type: FETCH_STREAMS, payload: response.data});
}

//Action creator to fetch a singular stream
//asynchronous action creator
export const fetchStream = (id) => async dispatch=>{
    //making a get request with axios
    //assigning the result to a 'response' variable
    //we 'await' the process to finish before doing anything else
    //example usage of get request is: axios.get(url);
    //in this case we add on `/streams/${id}` which is the /streams/ + id of the stream
    const response = await streams.get(`/streams/${id}`);

    //console.log(response.data);

    //Dispatching the action manually because we awaited it
    //payload is response.data which contains  a stream object that contains:
    //title, description, id and userId(if a user created the stream)
    dispatch({type: FETCH_STREAM, payload: response.data});
}

//Action creator to edit a stream
//asynchronous action creator
export const editStream = (id, formValues) => async dispatch=>{
    //making a patch request with axios
    //assigning the result to a 'response' variable
    //we 'await' the process to finish before doing anything else
    //example usage of patch request is: axios.patch(url, updateValues);
    //in this case we update the stream with a certain id by going /streams/id 
    //and update the values given in the formValues object, which has title and description
    //put updates ALL properties of a record
    //so we use patch becaues it updates SOME properties of a record
    const response = await streams.patch(`/streams/${id}`, formValues);

    //console.log(formValues);
    //console.log(response.data);

    //payload is response.data which contains  a stream object that contains:
    //title, description, id and userId(if a user created the stream)
    dispatch({type: EDIT_STREAM, payload: response.data});

    //navigate user to root route by using the push method to the root route
    history.push('/');
}

//Action creator to delete a stream
//asynchronous action creator
export const deleteStream = (id) => async dispatch =>{
    //making a delete request with axios
    //we 'await' the process to finish before doing anything else
    //example usage of delete request: axios.delete(url);
    await streams.delete(`/streams/${id}`);

    //dispatching the id of the deleted stream as payload
    dispatch({type: DELETE_STREAM, payload: id});

    //navigate user to root route by using the push method to the root route
    history.push('/');
}