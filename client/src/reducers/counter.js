export default (state = 0,action)=>{
    switch(action.type){
        case 'INCREMENT':
            console.log('reducer counter INCREMENT')
            return state + 1
            case 'DECREMENT':
                console.log('DECREMENT')
                return state -1
                default:
                    return state
    }
}