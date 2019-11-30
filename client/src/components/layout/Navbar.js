import React, {Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout,isNavbar} from '../../actions/auth'
import PropTypes from 'prop-types'
import $ from 'jquery'
import './style.scss'

const Navbar = ({
  auth: {
    isAuthenticated,
    loading
  },
  logout,isNavbar
}) => {
  useEffect(() => {
    isNavbar()
    console.log('useEffect')
    var didScroll
    var lastScrollTop =0
    var delta = 5
    var navbarHeight = $('.navbar').outerHeight()
    $(window).scroll(function(event){
      console.log('scroll')
      didScroll = true
    })
    setInterval(() => {
      if(didScroll){
        hasScrolled()
        didScroll = false
        console.log('didscroll')
      }
    }, 250);
    function hasScrolled(){
      console.log('hasscroll')
      var st = $(window).scrollTop()
      console.log(st,this,navbarHeight,lastScrollTop)
      if(Math.abs(lastScrollTop - st) <= delta){
        return console.log('return')
      }
      if(st > lastScrollTop && st > navbarHeight){
        $('.navbar').removeClass('nav-down').addClass('nav-up')
        console.log('addup')
      }else{
        if(st + $(window).height() < $(document).height()) { 
          $('.navbar').removeClass('nav-up').addClass('nav-down')
          console.log('removeup')
        }
      }
      lastScrollTop = st
    }
  },[isNavbar])
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

      <nav className='navbar fixed-top bg-deep-grey' style={{height:'4rem',paddingTop:'1rem',transition:'top 0.3s linear'}}>
      
          <Link className='navbar-brand ' to='/'><h6>
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
export default connect(mapStateToProps, {logout,isNavbar})(Navbar)