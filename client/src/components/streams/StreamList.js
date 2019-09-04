//importing react library
import React from 'react';

//importing react-redux functionality
import {connect} from 'react-redux';

//importing react router dom functionality
import {Link} from 'react-router-dom';

//importing action creator
import {fetchStreams} from '../../actions';

class StreamList extends React.Component{
    //using the componentDidMount lifecycle method to call the action creator to fetch the streams
    componentDidMount(){
        this.props.fetchStreams();
    }

    //helper function
    //shows edit and delete Links if the streams are created by the logged in user
    renderAdmin = (stream) =>{
        if(stream.userId === this.props.currentUserId){
            return(
                <div className="right floated content">
                    {/* Here are links to the edit and delete buttons. When a user clicks on a stream to either edit to delete,
                    it will take the user the appropriate edit/delete page but will also add a forward slash with the id of the 
                    stream they clicked on, in order to do something with that information, in this case it will edit or 
                    delete that stream with the shown id*/}
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
                    <Link className="ui button negative" to={`/streams/delete/${stream.id}`}>Delete</Link>
                </div>
            );
        }
    }

    renderList = () =>{
        return this.props.streams.map(stream=>{
            return(
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"/>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        });
    }

    //helper function
    //renders create a "button" (its a link actually) if user is signed in to navigate to StreamCreate
    renderCreate(){
        if(this.props.isSignedIn){
            return(
                <div style={{textAlign:'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                        Create Stream
                    </Link>
                </div>
            );
        }
    }

    render(){
        //console.log(this.props.streams);
        return(
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
            </div>
        );
    }
}

const mapStateToProps = (state) =>{
    //Object.value() is a built in javascript function that takes in an object as an argument
    //all of the different values inside of the object are going to be pulled out and inserted into an array 
    return({
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
        });
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);