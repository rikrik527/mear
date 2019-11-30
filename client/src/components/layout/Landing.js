import React, {useEffect, Fragment, useState} from 'react'
import './style.scss'
import {notNavbar} from '../../actions/auth'
import history from '../routing/history'
import {Link, Redirect, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import $ from 'jquery'
import ReactTooltip from 'react-tooltip'
import Mrjudo from './Mrjudo'
import MrjudoBook from './MrjudoBook'
const img = require('../../img/mrjudo.jpg')

const Landing = ({notNavbar,isAuthenticated, history}) => {
  
  useEffect(() => {
    notNavbar()
    if (isAuthenticated) {
      console.log('landing page isAuthenticated')
      return history.push('/dashboard')
    }else{
      console.log('pageclose')
      pageClosed()
    }
    
  }, [])
  const [check,
    setChecking] = useState(false)
  const [display,
    toggleDisplay] = useState(false)

  
  const pageClosed = () => {
    

    setTimeout(() => {
      document
      .querySelector('.book .paper:not(.first) .page')
      .style
      .transition = 'all 2s linear';
      document
        .querySelector('.book')
        .style
        .transform = 'rotatex(45deg)rotatey(0deg)rotatez(-11deg)'
      document
        .querySelector('.first')
        .style
        .transform = 'translatez(0.4px)rotatey(0deg)'
    }, 2000);

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

      
          setTimeout(() => {

            history.push('/login')

          }, 3001)
        }, 3000);

        console.log('clicked')
      }

      return (

        <Fragment>

          <div id="container">
            <div class="book">
              <canvas id='canvas'></canvas>
              <div class="first paper">
                <div class="page front contents bg-deep-cyan">
                  <div class="intro">
                  <div className='cover-mrjudo'>
                    <MrjudoBook/>
                    </div>
                    <h5 className='text-center'></h5>
                    <div className='container'>
                      <div className='row'>
                        <div className='col-sm-12'>
                          <div className='card-ex text-white'>

                            <div className='css-mrjudo'></div>
                            <Mrjudo/>
                            <div className='card-header text-center'>
                              <p>及時佈施,超度自我</p>
                              <p>捐銀捐兩,造福子孫</p>
                              <p>奉獻金錢,有益健康</p>
                              <p></p>
                            </div>

                            <div className='form-group float-left'>
                              <div className='alert alert-danger'>
                                <h4 className='alert-heading'>聲明:</h4>本網站不負責一切法律相關責任,同意請勾選同意
                              </div>
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

                            </div>
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
    export default connect(mapStateToProps, {notNavbar})(Landing)