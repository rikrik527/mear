import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../actions/auth'
import PropTypes from 'prop-types'

const Navbar = ({
  auth: {
    isAuthenticated,
    loading
  },
  logout
}) => {
  useEffect(() => {})
  const authLinks = () => {
    return (
      <ul>
        <li>
          <Link to='/profiles'>
            developers
          </Link>

        </li>
        <li>
          <Link to='/posts'>
            Posts
          </Link>
        </li>
        <li>
          <Link to='/dashboard'>
            <i className='fas fa-user'/>{''}
            <span className='hide-sm'>我的帳戶</span>
          </Link>
        </li>
        <li>
          <a onClick={logout} href='#!'>
            <i className='fas fa-sign-out-alt'/>{''}
            <span className='hide-sm'>登出</span>
          </a>
        </li>
      </ul>
    )
  }
  const guestLinks = () => {
    return (
      <ul>
        <li>
          <Link to='/profiles'>
            developers
          </Link>
        </li>
        <li>
          <Link to='/register'>註冊</Link>
        </li>
        <li>
          <Link to='/login'><span className='hide-sm'>登入</span></Link>
        </li>
      </ul>

    )
  }

    return (

      <nav className='navbar bg-bluegrey10' style={{height:'4rem',paddingTop:'1rem'}}>
      
          <Link to='/'><h6>
            <i className='fas fa-code'/>mrjudobook</h6>
          </Link>
       
        {!loading && (
          <Fragment>{isAuthenticated
              ? authLinks()
              : guestLinks()}</Fragment>
        )}
      </nav>

    )
  
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired

}
const mapStateToProps = state => ({auth: state.auth})
export default connect(mapStateToProps, {logout})(Navbar)