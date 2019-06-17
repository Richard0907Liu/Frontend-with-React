// Receive the action and then act on comments.js

//The remaining one is the dishes, the leaders and the promotions 
//don't need to take any action when they receive that action.
// So import ./ActionTypes
import * as ActionTypes from './ActionTypes';

// ###### Comments will be used by ConfigureStore.js #######
export const Comments = (state = {
            isLoading: true,
            errMess: null,
            comments: []
    }, action) => {  
    switch(action.type) {
        case ActionTypes.ADD_COMMENTS:  
            return {...state, isLoading: true, errMes: null, comments: action.payload} 

        case ActionTypes.COMMENTS_FAILED:
            return {...state, isLoading: true, errMes: action.payload} 

        case ActionTypes.ADD_COMMENT: // it from ADD_COMMENT's String in ActionType
            var comment = action.payload; // contain four properties
            // comment.id = state.comments.length; // useless, id automatically is produce by the server
            comment.date = new Date().toISOString();
            
            return {...state, comments: state.comments.concat(comment)};
        default:
            return state;
    // go to MainComponent
    }

}