import React, {useEffect, Fragment, useState} from 'react'
import './style.css'
import history from '../routing/history'
import {Link, Redirect,withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import $ from 'jquery'
import ReactTooltip from 'react-tooltip'
const img = require('../../img/mrjudo.jpg')

const Landing = ({
  isAuthenticated,history
}) => {

  const [check,
    setChecking] = useState(false)
  const [display,
    toggleDisplay] = useState(false)

  if (isAuthenticated) {
    console.log('landing page')
    return <Redirect to='/dashboard'/>
  }

  const pageOpen = () => {
    console.log('open')

    document
      .querySelector('.first')
      .style
      .transform = 'translateZ(0.4px)rotateY(-180deg)';
    setTimeout(() => {
      
      document
        .querySelector('.book')
        .style
        .transform = 'rotatex(0deg)rotatey(0deg)rotatez(0deg)scale(10)';
      document
        .querySelector('.book .paper:not(.first) .page')
        .style
        .transition = 'all 3s linear';
      document
        .querySelector('.book .paper:not(.first) .page')
        .style
        .background = 'white';
        setTimeout(()=>{
       
       
          history.push('/register')
        
        },4000)
    }, 3000);
    
    console.log('clicked')
  }

  return (

    <Fragment>

      <div id="container">
        <div class="book">
          <div class="first paper">
            <div class="page front contents">
              <div class="intro">
                <h2 className='text-blue5 text-center'>mrjudobook</h2>
                <h5 className='text-blue4 text-center'></h5>
                <div className='container'>
                  <div className='row'>
                    <div className='col-sm-12'>
                      <div className='card-ex text-blue4'>
                        <img
                          src={img}
                          style={{
                          'width': '40%'
                        }}
                          className='card-img-top'
                          alt='card-img'/>
                        <div className='card-header float-right'>
                          <p>及時佈施,超度自我</p>
                          <p>捐銀捐兩,造福子孫</p>
                          <p>奉獻金錢,有益健康</p>
                          <p></p>
                        </div>

                        <form className='form'>
                          <p className='alert alert-danger'>聲明:本網站不負責一切法律相關責任,同意請勾選同意
                          </p>
                          <div className="custom-control custom-checkbox">
                            <input
                              type="checkbox"
                              onChange={() => {
                              setChecking(!check);
                              toggleDisplay(!display);
                              console.log(check, display)
                            }}
                              className="custom-control-input"
                              id="customCheck1"/>
                            <label className="custom-control-label" htmlFor="customCheck1">同意</label>
                            <button
                              onClick={() => {
                              pageOpen();
                            }}
                              type='button'
                              className={`btn btn-primary ${display
                              ? 'd-block-opacity'
                              : 'd-none-opacity'}`}>繼續</button>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
            <div className="page back"></div>
          </div>
          <div className="second paper">
            <div className="page front contents">
              <div id="vara-container"></div>
            </div>
            <div className="page back"></div>
          </div>
          <div className="third paper">
            <div className="page front contents">
              <div id="vara-container2"></div>
            </div>
            <div className="page back"></div>
          </div>
          <div className="fourth paper">
            <div className="page last front contents">
              <div id="vara-container3"></div>
            </div>
            <div className="page back"></div>
          </div>
          <div className="side"></div>
          <div className="bottom"></div>
          <div className="shadow"></div>
        </div>
      </div>

    </Fragment>

  )
}
Landing.propTypes = {}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated})
export default connect(mapStateToProps, {})(Landing)