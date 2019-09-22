import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
const Alert = ({alerts}) => {
    return (
        <div>
            
        </div>
    )
}
Alert.propTypes ={
 alerts:PropTypes.func.isRequired
}
const mapStateToProps = (state, ownProps) => {
   alerts:state.alert
}
export default Alert
