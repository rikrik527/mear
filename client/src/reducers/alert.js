import {SET_ALERT,REMOVE_ALERT, CHANGE_CLASS} from '../actions/types'

const initialState =[]

export default function(state = initialState,action){
    const { type,payload} = action
    switch(type){
        case SET_ALERT:
            console.log('stat',state,'payload',payload)
            return [...state,payload]
            case REMOVE_ALERT:
                
                return state.filter(alert=>alert.id !== payload?console.log('alert',alert):console.log('a;ert',alert))
                default:
                    console.log('state',state)
                    return state
    }
}