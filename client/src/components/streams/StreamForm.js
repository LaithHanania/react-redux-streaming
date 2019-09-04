//this is a reusable component for the create, edit and delete components

//Copying in everything from StreamCreate:

//importing react libraries
import React from 'react';

//importing functionality from redux-form library
//Field is a react component which is why its capitalized first
//reduxForm is a function which essentially has the same functionality as the connect function from react-redux
//it is going to make sure we can call some action creator and get some form data into our component (all happens automatically)
import {Field,reduxForm} from 'redux-form';

//import react-redux connect functionality
import {connect} from 'react-redux';

//Since we connected reduxForm to this, this component gets a lot of props
class StreamForm extends React.Component{
    //This helper function receives props from the Field
    //This function is made to return an input to be used as an component for Field
    //By the way we can destruction formProps to whatever we wanna use like do this instead:
    //renderInput=({input, label, meta})=>{...}
    renderInput = (formProps) =>{
        //console.log(formProps);
        //console.log(formProps.meta);
 
        /*
        return(
            <input 
                onChange={formProps.input.onChange}
                   value={formProps.input.value}
                   /> //We have to hook up the correct things of the form to the input
        );
        */

        //We could also use different syntax to make a shorter version like:
        //this takes the formProps input props and adds them to the input element as props

        //deciding the className so that the semantic ui shows a red bar around the input field using es2015 notation:
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`

        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} autoComplete="off"/> {/* we can also turn off autoComplete by autoComplete="off" (optional) */}
                {/*<div>{formProps.meta.error}</div>*/}
                {this.renderError(formProps.meta)}
            </div>
        ); 
    }

    //helper function to display errors
    //renderError is passed into it the meta object and we destructure out of it the error and touched props
    //error is the error message and touched is a bool that indicates true if a user clicked on a form element then clicked off of it
    renderError({error, touched}){
        if(touched && error){
            return(
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    }


    //removing this for streamForm:
    //helper method
    /*
    onSubmit =(formValues) =>{
        //console.log(formValues);

        //Calling action creator for creating stream:
        this.props.createStream(formValues);

    }*/
    //and replacing with this because its being reused and somethings being passed in from parent component:
    onSubmit = formValues =>{
        this.props.onSubmit(formValues);
    }

    render(){
        //console.log(this.props);

        //A <Field /> can be a checkbox, input or dropdown or anything that asks the user for input
        //we need to provide it some number of props
        //The name props is the name of prop the field will manage (must include name prop in all Field tags)
        //WE also have to assign the component prop which is either a react component or function the field will call which must
        //return an element for the field to show.
        //So the Field component is really just about hooking up all the redux-form infrastructure
        //when submitting the form using onSubmit, since we're using redux-form we have to call the handleSubmit prop and 
        //pass into it our helper method for submitting the form
        //redux-form automatically does event.preventDefault() so we dont have to do it in our helper function onSubmit()
        return(
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

//A function to ensure that the user entered valid information
//The formValues argument is going to contain all the values inside our form
//If the user entered in everything correctly, return an empty object
//if not, return an object that has for each invalid field, a key-value pair on the object with the
//name of the field and the error message
const  validate = (formValues) =>{
    //defining an errors object at the start which is empty, but has values incrementally added to it
    //for each error
    //the name of the key in the object must match the name of the field
    //For clarification: <Field name="theName" > and errors.theName should be the same theName
    const errors={};

    if(!formValues.title){
        //only ran if the user didnt enter a title
        errors.title='You must enter a title';
    }

    if(!formValues.description){
        //only ran if the user didnt enter a description
        errors.description='You must enter a description';
    }

    return errors;
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

//way number two is creating a cariable with reduxForm in it then calling connect:
//reduxForm has identical syntax to connect()() from react-redux
//In the first parenthesis we pass it an object for configuration
//reduxForm takes a single object which we put configuration into instead of separate arguments

/* removed this for form:
const formWrapped = reduxForm({
    form: 'streamCreate', //the first key is the name of the form in this case
                        //usually the name is what its functionality is, so in this its streamCreate for example
    validate: validate  //this key is specified for validation functionality of form inputs
})(StreamForm);
*/

export default connect()(reduxForm({
    form: 'streamForm', //the first key is the name of the form in this case
                        //usually the name is what its functionality is, so in this its streamCreate for example
    validate: validate  //this key is specified for validation functionality of form inputs
})(StreamForm));

//removed this:
//export default connect(null, {createStream})(formWrapped);