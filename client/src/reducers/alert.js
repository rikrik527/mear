import {SET_ALERT,REMOVE_ALERT} from '../actions/types'

const initialState =[]

export default function(state = initialState,action){
    const { type,payload} = action
    switch(type){
        case SET_ALERT:
            console.log('state',state,'payload',payload)
            return [...state,payload]
            case REMOVE_ALERT:
                return state.filter(alert=>alert.id !== payload)
                default:
                    console.log('state',state)
                    return state
    }
}