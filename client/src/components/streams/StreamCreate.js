//importing react libraries
import React from 'react';

//import react-redux connect functionality
import {connect} from 'react-redux';

//importing createStream action creator
import {createStream} from '../../actions';

//importing local component
import StreamForm from './StreamForm';

//Since we connected reduxForm to this, this component gets a lot of props
class StreamCreate extends React.Component{
    //helper method
    onSubmit =(formValues) =>{
        //console.log(formValues);

        //Calling action creator for creating stream:
        this.props.createStream(formValues);

    }

    render(){
        return(
        <div>
            <h3>Create a Stream</h3>
            <StreamForm onSubmit={this.onSubmit}/>
        </div>
        );
    }
}

//reduxForm has identical syntax to connect()() from react-redux
//In the first parenthesis we pass it an object for configuration
//reduxForm takes a single object which we put configuration into instead of separate arguments
//then adding the connect function to it since we're calling an action creator and want to hook up our own redux and there are two ways
//way number one is just adding connect() then wrapping all the reduxForm stuff in the second ():
/*
export default connect()(reduxForm({
    form: 'steamCreate', //the first key is the name of the form in this case
                        //usually the name is what its functionality is, so in this its streamCreate for example
    validate: validate  //this key is specified for validation functionality of form inputs
})(StreamCreate));
*/



export default connect(null, {createStream})(StreamCreate);
