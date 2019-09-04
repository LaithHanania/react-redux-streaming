//creating modal component

//importing react library
import React from 'react';

//we import react-dom for modal
import ReactDOM from 'react-dom';

const Modal = props =>{
    //creating a portal using ReactDOM, and it takes in a JSX argument and a reference to the element I want to
    //render this portal into
    //we created a sibling div to the body in the index.html with the id of modal to attatch the modal to using
    //document.querySelector('#idOfDiv')
    return ReactDOM.createPortal(
        /*  the onClick is for when the user clicks in the background of the modal and we navigate the user
            out of the modal*/
        <div onClick={props.onDismiss} className="ui dimmer modals visible active">
            {/* e is the event object called when an event happens, and stopPropagation is a method of it
                to stop trying to find a handler for it in a parents element so that when we click inside the modal
                it doesnt try to exit like it would if we clicked outside */}
            <div onClick={(e)=>e.stopPropagation()} className="ui standard modal visible active">
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
         document.querySelector('#modal')
    );
};

export default Modal;