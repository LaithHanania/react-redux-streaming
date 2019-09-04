//Importing react library
import React from 'react';

//importing react-redux library
import {connect} from 'react-redux';

//Importing action creators
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{
    //initializing component-level state
    //we're giving isSignedIn a value of null at the start because we dont know
    //if theyre signed in or not at the start
    //removed component level state because we want to use redux
    //state={isSignedIn: null};

componentDidMount(){
    //This sends the google api a request specifically for the authentication
    //This takes some time to do (to send a request, and then some feedback to be given)
    //so we add in a second argument of an arrow function which will only be called when
    //the 'client:auth2' has been successfully loaded up into gapi
    //We give our client ID but we also must specify the scope, which is the different parts
    //of the user account we want to get access to
    //All of this initializes the library
    //init returns a promise which is an object that'll give us a "tap on the shoulder"
    //after the client library has been successfully intialized
    //so the .then() executes after the library has been initialized
    window.gapi.load('client:auth2', ()=>{
        window.gapi.client.init({
            clientId: '235215588910-022ltpdk5eqsad30129pas27v1vsgk57.apps.googleusercontent.com',
            scope: 'email'
        }).then(()=>{
            this.auth = window.gapi.auth2.getAuthInstance(); //after running this, inside any other function inside my class
                                                            //we can reference this.auth which will give us a reference
                                                            //to that auth instance that we can use to sign the user in or out or get their current
                                                            //authentication status

            //the following is component level state and we want redux so i removed it
            //this.setState({isSignedIn: this.auth.isSignedIn.get()});
            //instead we're going to do:
            this.onAuthChange(this.auth.isSignedIn.get());
            //to dispatch the correct actions with the initial value 

            //Setting up an event listener to detect changed of user signing in/out
            //And passing in to it a callback function
            this.auth.isSignedIn.listen(this.onAuthChange);
        });
    })
}

    //callback function for when the users sign in state changes
    //onAuthChange receives true/false when called anyway so we dont need to .get() inside
    //calls the correct action depending on sign in status
    onAuthChange = (isSignedIn) =>{
        //Updating state of isSignedIn
        //Reminder: this.auth is our refernce to our auth object
        //then we get new value of the isSignedIn property and update our state with it
        //we're removing component level state to do redux stuff
        //this.setState({isSignedIn: this.auth.isSignedIn.get()})

        if(isSignedIn){
            //When a user signs in I want to eventually get their user ID too
            //so I pass into the action their user Id from an auth instance
            this.props.signIn(this.auth.currentUser.get().getId());
        }else{
            this.props.signOut();
        }
    }

    //Functionality for signing in when button is pressed
    onSignInClick = () =>{
        this.auth.signIn();
    }

    //Functionality for signing out when button is pressed
    onSignOutClick = () =>{
        this.auth.signOut();
    }

    //helper method
    //this method prints stuff out according to whether the user is signed in or not or we dont know
    renderAuthButton(){
        if(this.props.isSignedIn === null){
            return(null);
        }else if(this.props.isSignedIn){
            return(
                <button onClick={this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }else{
            return(
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In With Google
                </button>
            );
        }
    }

    render(){
        return(
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) =>{
    return({isSignedIn: state.auth.isSignedIn});
}

export default connect(mapStateToProps,{signIn, signOut})(GoogleAuth);