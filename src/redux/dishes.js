// why????? remove import { DISHES } from '../shared/dishes'; 
import * as ActionTypes from './ActionTypes';

/**Now, since we already have the switch statement, so I should be 
 * able to now switch between the three different action types that 
 * I'm going to receive 
 * Change the state here*/

export const Dishes = (state = {
        isLoading: true,  // 
        errMess: null,  // when DISHES_FAILED is active, show this message
        dishes: [] // empty array
    }, action) => {
    switch(action.type) {
        /**Go to the server "fetch" dish information from the server, set isLoading is true,
         * once "obtain" the dish info from server, set isLoading is false and then load in 
         * the dishes into the dishes property of this part of the state.
         */
        // When call the ADD_DISHES, isLoading should be false, because dishes will be loaded in.
        case ActionTypes.ADD_DISHES:  
            return {...state, isLoading: false, errMes: null, dishes: action.payload} 
        // When call the DISHES_LOADING, if isLoading was originally false set to true meaning that you're beginning to fetch new dishes.
        case ActionTypes.DISHES_LOADING: 
            return {...state, isLoading: true, errMes: null, dishes: []} 
            /**  "...state, sprint operator fro ES6", what ever the state is, going to take the same state and then I can add
                 ...state will not be mutated, instead take the state and create a new object from the original state
                 and make some changes to that object and then return  that object.
            */
        case ActionTypes.DISHES_FAILED:
            return {...state, isLoading: false, errMes: action.payload, dishes: []} 
        default:
            return state;

    }

}