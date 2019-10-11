import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const background = require('../../img/showcase.jpg')
const logoMrjudo = require('../../img/mrjudo.jpg')
const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard'/>
  }
  return (
    <section className='landing'>

      <div className='landing-inner'>
        <h1
          className="text-hide"
          style={{
          backgroundImage: `url(${background})no-repeat`
        }}>mrjudobook</h1>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-12 col-md-6 text-center'>
              <div className="jumbotron bg-primary">
                <div className='col-sm-12'><i className='fa fa-search fa-lg mr-3 mb-3'/>追蹤你的興趣</div>
                <div className='col-sm-12'><i className='fa fa-file-signature fa-lg mb-3'/>
                  探索熱門話題</div>
                <div className='col-sm-12'><i className='fa fa-comments fa-lg mr-3 mb-3'/>加入對談</div>
              </div>
            </div>
            <div className='col-sm-12 col-md-6'>
              <div className='jumbotron bg-dark'>
                <div className='alert border border-info rounded bg-dark mb-4'>

                  <img
                    className="rounded-circle float-left"
                    style={{
                    width: '50px',
                    height: '50px',
                    marginRight: '2%'
                  }}
                    src={logoMrjudo}
                    alt='logo-mrjudo'/>
                  <h6 className='text-warning text-sm-left'>看看世界發生了什麼事情?</h6>

                </div>
                <Link
                  to='/register'
                  className="d-block btn btn-primary text-center mb-3"
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off">註冊
                </Link>
                <Link
                  to='/login'
                  className='d-block btn btn-light text-center'
                  data-toggle="button"
                  aria-pressed="false"
                  autoComplete="off">登入
                </Link>
                <div className="col">
                  <h5 className='mt-5'>今天就加入 mrjudobook</h5>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  )
}
Landing.propTypes = {}
const mapStateToProps = state => ({isAuthenticated: state.auth.isAuthenticated})
export default connect(mapStateToProps, {})(Landing)