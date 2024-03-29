//importing react library
import React from 'react';

//importing react-redux functionality
import {connect} from 'react-redux';

//importing flv for streaming and video creation
import flv from 'flv.js';

//importing action creator
import {fetchStream} from '../../actions';

class StreamShow extends React.Component{
    constructor(props){
        super(props);

        this.videoRef = React.createRef();
    }

    componentDidMount(){
        const {id} = this.props.match.params;

        //console.log(this.videoRef);

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate(){
        this.buildPlayer();
    }

    componentWillUnmount(){
        //console.log('I was unmounted');
        this.player.destroy();
    }

    buildPlayer(){
        if(this.player || !this.props.stream){
            return;
        }
        const {id} = this.props.match.params;

        this.player = flv.createPlayer({
            type: 'flv',
            url:  `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render(){
        if(!this.props.stream){
            return <div>Loading...</div>;
        }

        const {title, description} = this.props.stream;


        return(
            <div>
                <video ref={this.videoRef} style={{width: '100%'}} controls={true}/>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
    }
}

const mapStateToProps=(state, ownProps)=>{
    return({stream: state.streams[ownProps.match.params.id]});
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);