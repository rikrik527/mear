import React,{useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { displayData}from '../../actions/auth'
import {getCurrentProfile} from '../../actions/profile'
import Spinner from '../layout/Spinner'
const Dashboard = ({getCurrentProfile,displayData,auth:{user},profile:{loading,profile}}) => {
    console.log('dashbors')
    useEffect(()=>{
        getCurrentProfile()
        
    },[])
    

    return loading && profile === null ? <Spinner/> : <Fragment>
        <h1 className='large text-primary'>Dashboard</h1>
        <p className='lead'>
            <i className='fas fa-user'/>Welcome {user && user.name}
            
            <div class="alert-primary" role="alert">
  A simple primary alert—check it out!
</div>
<div class="alert alert-secondary" role="alert">
  A simple secondary alert—check it out!
</div>
<div class="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
<div class="alert alert-danger" role="alert">
  A simple danger alert—check it out!
</div>
<div class="alert alert-warning" role="alert">
  A simple warning alert—check it out!
</div>
<div class="alert alert-info" role="alert">
  A simple info alert—check it out!
</div>
<div class="alert alert-light" role="alert">
  A simple light alert—check it out!
</div>
<div class="alert alert-dark" role="alert">
  A simple dark alert—check it out!
</div>
        </p>
        {profile !== null ?<Fragment>has</Fragment>:<Fragment>has not</Fragment>}
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
