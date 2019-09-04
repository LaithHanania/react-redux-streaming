//Importing react libraries
import React from 'react';

//Importing react-router-dom libraries
//We installed it in our project terminal by: npm install --save react-router-dom
import {Router, Route, Switch} from 'react-router-dom';

//Importing local components
import StreamCreate from './streams/StreamCreate';
import StreamDelete from './streams/StreamDelete';
import StreamEdit from './streams/StreamEdit';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';

//importing our created history object
import history from '../history';

//Different routes can be matched by the same URL, meaning doing :
//<Route path="/" exact component={PageOne}/>
//<Route path="/" exact component={PageOne}/>
//Twice means that the PageOne component will be displayed twice on the localhost:3000 URL
//Also, if we remove the exact property from above and do:
//<Route path="/" component={PageOne}/>
//<Route path="/pagetwo" component={PageTwo}/>
//Then on localhost:3000/pagetwo both the PageOne and PageTwo components show
//So the exact prop makes sure that the component shows only if the path matches the typed one exactly
//So instead of the path working as extractedPath.contains(path) and then finding what paths exist in the extracted path
//it becomes more of extractedPath === path
//refer to notebook of "How Paths Get Matched" for more examples
const App = () =>{
    return(
        <div className="ui container">
            {/* Using a custom Router instead of BrowserRouter because we want to pass in a history object we created
                and BrowserRouter doesnt support that, we're doing it beacuse its easier to use the history object
                if we created it ourselevs and its easier to navigate the user automatically (programmatically) as well, and 
                we pass in the history object by doing passing the history prop*/}
            <Router history={history}>
                <div>
                    <Header />
                        <Switch> {/* Switch looks at all of the routes and only shows one of the given routes*/}
                        <Route path="/" exact component={StreamList}/>
                        <Route path="/streams/new" component={StreamCreate}/>
                        <Route path="/streams/edit/:id" component={StreamEdit}/> {/* the /:id means that whenever a user goes to streams/edit/anything
                                                                                    we will be showing the StreamEdit component*/}
                        <Route path="/streams/delete/:id" component={StreamDelete}/>
                        <Route path="/streams/:id" component={StreamShow}/>
                        </Switch>
                </div>
            </Router>
        </div>
    );
}

//Exporting app component
export default App;

//Short example on how react-router-dom works:
/*
//creating a functional component
//We use the <Link> tag to navigate between pages instead of <a>
const PageOne=()=>{
    return(
        <div>
            Page One
            <Link to="/pagetwo">Navigate To Page Two</Link>
        </div>
        );
}

//creating another functional component
//We use the <Link> tag to navigate between pages
const PageTwo=()=>{
    return(
    <div>
        Page Two
        <Link to="/">Navigate To Page One</Link>
    </div>
    );
}

const App = () =>{
    return(
        <div>
            <BrowserRouter>
                <div>
                    <Route path="/" exact component={PageOne}/>
                    <Route path="/pagetwo" component={PageTwo}/>
                </div>
            </BrowserRouter>
        </div>
    );
}

//after that, the main page, the one you land at when the react app load (http://localhost:3000/) will say page one
//if u amend the html in the browser to http://localhost:3000/pagetwo, it will say page two
*/

//Different types of routers:
//BrowserRouter, HashRouter, MemoryRouter
//Importing each:
//import {BrowserRouter, HashRouter, MemoryRouter} from 'react-router-dom';
//Check notebook at "Different Router Types" for more info
//Differences in the URL paths are:
//BrowserRouter: uses everything after the TLD (.com, .net) or port as the 'path'. ex: localhost:3000/pagetwo
//HashRouter: uses everything after a # as the 'path'. ex: localhost:3000/#/pagetwo
//MemoryRouter: Doesn't use the URL to track navigation. ex: lcalhost:3000/
//in this application we want to use a created history object so we cant use one of these default routers, we need
//to make a custom router on our on so we use <Router> but if we didnt use it then we were going to use <BrowserRouter>
//we can apply these with the same effect on our example code, like this:
/*
const App = () =>{
    return(
        <div>
            <BrowserRouter> //or <HashRouter> or <MemoryRouter>
                <div>
                    <Route path="/" exact component={PageOne}/>
                    <Route path="/pagetwo" component={PageTwo}/>
                </div>
            </BrowserRouter> //or </HashRouter> or </MemoryRouter>
        </div>
    );
}
*/ //and notice the effects it has on the URL

