import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { displayData}from '../../actions/auth'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
import DashboardAction from './DashboardAction'
const Dashboard = ({getCurrentProfile,displayData,auth:{user},profile:{loading,profile}}) => {
    console.log('dashbors')
    useEffect(()=>{
        getCurrentProfile()
        
    },[])
    

    return loading && profile === null ? <Spinner render={console.log('loading')}/> : <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'/>Welcome {user && user.name}
        </p>
        {profile !== null ?(
            <Fragment>
            <DashboardAction/>
            </Fragment>
            ):(
            <Fragment>
            <p>You have not yet setup a profile,please add some info</p>
            <Link to='/create-profile' className='btn btn-primary'>
                Create Profile
            </Link>
            </Fragment>
        )}
    </Fragment>
}

Dashboard.propTypes = {
    getCurrentProfile:PropTypes.func.isRequired,
 auth:PropTypes.object.isRequired,
 profile:PropTypes.object.isRequired
}
const mapStateToProps = state => ({
   auth:state.auth,
   profile:state.profile
})
export default connect(mapStateToProps,{displayData,getCurrentProfile})(Dashboard)
