//importing react library
import React from 'react';

//importing react-redux functionality
import {connect} from 'react-redux';

//importing react-router-dom functionality
import {Link} from 'react-router-dom';

//importing actions
import {fetchStream, deleteStream} from '../../actions';

//importing modal
import Modal from '../Modal';

//importing history object
import history from '../../history';

class StreamDelete extends React.Component{
    componentDidMount(){
        //console.log(this.props);
        this.props.fetchStream(this.props.match.params.id);
    }

    renderActions(){
        const {id} = this.props.match.params;

        return(
            //a react fragment is essentially a jsx looking element that lets us to return mutliple elements or assign
            //multiple elements to the signle variable but when rendered onto the screen doesnt produce HTML
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?'
        }

        return `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
    }
    
    render(){
        return(
                <Modal 
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions= {this.renderActions()}
                    onDismiss= {() => history.push('/')}
                />
            );
    }
}

const mapStateToProps = (state, ownProps) =>{
    return({stream: state.streams[ownProps.match.params.id]});
}

export default connect(mapStateToProps, {fetchStream, deleteStream})(StreamDelete);