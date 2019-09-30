import axios from 'axios'
import {REGISTER_SUCCESS,REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_SUCCESS,LOGIN_FAIL,LOGOUT,DISPLAY_DATA,REMOVE_DISPLAY_DATA,CLEAR_PROFILE}from'./types'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'
//load user
export const loadUser =()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        console.log('res = await axios.get(/api/auth)',res,'load user')
        dispatch({
            type:USER_LOADED,
            payload:res.data
        })
    } catch (err) {
        dispatch({
            type:AUTH_ERROR
        })
    }
}


//register user
export const register =({name,email,password})=>async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,email,password})
    try {
        const res = await axios.post('/api/users',body,config)
        console.log('res registered',res.data)
        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        console.log('register sucess')
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        console.log('err.response',err)
        if(errors){
            console.log('errors',errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
            
        }
        dispatch({
            type:REGISTER_FAIL
        })
    }
}
export const login =(email,password)=>async dispatch=>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({email,password})
    try {
        const res = await axios.post('/api/auth',body,config)
        console.log('login res.data',res)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser())
    } catch (err) {
        const errors = err.response.data.errors
        console.log('err.response log fail',err.response)
        if(errors){
            console.log('errors',errors)
            errors.forEach(error=>dispatch(setAlert(error.msg,'danger')))
            
        }
        dispatch({
            type:LOGIN_FAIL
        })
    }
}
export const logout =()=>dispatch =>{
    dispatch({
        type:CLEAR_PROFILE
    })
    dispatch({
        type:LOGOUT
    })
}
export const displayData =(name,avatar)=>async dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }
    const body = JSON.stringify({name,avatar})
    try {
        const res = await axios.get('/api/profile/me',body,config)
         console.log('displayDate res',res)
            dispatch({
                type:DISPLAY_DATA,
                userName:res.data.name,
                avatar:res.data.avatar
            })
    } catch (err) {
        console.error(err)
        dispatch({
            type:REMOVE_DISPLAY_DATA
        })
    }
    

}