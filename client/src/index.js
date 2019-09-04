//Importing React libraries
import React from 'react';
import ReactDOM from 'react-dom';

//Importing redux and react-redux libraries
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';

//importing redux-thunk
import reduxThunk from 'redux-thunk';

//Importing local files
import App from './components/App';

//Importing redux reducers that I created
import reducers from './reducers';

//Setting redux devtools to inspect and debug redux store
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Creating redux store and passing reducers and composeEnhancers
//composeEnhancers to setup redux devtools
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk))
    );

ReactDOM.render(
    //Wrapping the app component with the Provider tags, passing in the redux store to the store prop
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);
