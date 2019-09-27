import axios from 'axios'

const setAuthToken =token=>{
    if(token){
        console.log('there is token')
        axios.defaults.headers.common['x-auth-token'] = token
    }else{
        console.log('removed token')
        delete axios.defaults.headers.common['x-auth-token']
    }
}
export default setAuthToken