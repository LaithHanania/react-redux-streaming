//Importing react and react router libraries
import React from 'react';
import {Link} from 'react-router-dom';

//Importing the google authentication component (local component)
import GoogleAuth from './GoogleAuth';

const Header = () =>{
    return(
        <div className="ui secondary pointing menu">
            <Link to="/" className="item">Streamer</Link>
            <div className="right menu">
                <Link to="/" className="item">All Streams</Link>
                <GoogleAuth />
            </div>
        </div>
    );
}

export default Header;