// export to App.js for all webpages
import {createStore, combineReducers, applyMiddleware} from 'redux';  // for redux
// NOT need reducer and initialState, because all reducers are already initialized
import {Dishes} from './dishes'; 
import {Comments} from './comments'; 
import {Promotions} from './promotions'; 
import {Leaders} from './leaders'; 
import thunk from 'redux-thunk';  // has redux-thunk, so dishes.js not need to import DISHES in sherd fold??
import logger from 'redux-logger';
import { createForms } from 'react-redux-form'; // add this form state into our store, it will create a reducer
import { InitialFeedback } from './forms';

// Because a reducer is splited, need to combine them together
// use {combineReducers} from redux

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            dishes: Dishes,  // from dishes.js in redux fold, ahnd then dishes export to other files
            comments: Comments,  // from Comments.js in redux fold
            promotions: Promotions,
            leaders: Leaders,
            ...createForms({
                /** need to add a new function in MainComponent
                it can preserve the message you type even after you leave this page.
                after submitting, the message you type will be clear and has a new form.
                */
                feedback: InitialFeedback // React-Redux-Form fills in all the details by itself.
                
            })      
        }),
        // applyMiddleware() will return in-store enhancer
        applyMiddleware(thunk, logger) //both of these are being supplied into our store as enhancers for our store
    );
    
    return store;
    // Update the application, go into the app.js file
    // The last step is to make use of the Connect from react-redux to connect 
    // the React application to the Redux Store. We do in the MainComponent
}