import React from 'react'
import PropTypes from 'prop-types'
import {onIncrement,onDecrement} from '../../actions/alert'
import {connect} from 'react-redux'
const Counter =({onIncrement,onDecrement})=>{
    
        
    
    const incrementIfOdd=(Counter)=>{
        if(this.props.value % 2 !== 0){
            onIncrement(Counter)
        }
    }
    const incrementAsync=(Counter)=>{
        setTimeout(onIncrement(Counter),1000)
    }
    
        const { value }=this.props
        console.log('this.props',this.props)
        return(
            <p style={{position:'absolute',top:'70px'}}>
                Clicked:{console.log(value)} times
                {''}
                <button onClick={onIncrement}>
                    +
                </button>
                {''}
                <button onClick={onDecrement}>
                    -
                </button>
                {''}
                <button onClick={()=>incrementIfOdd(Counter)}>
                    Increment if odd
                </button>
                {''}
                <button onClick={()=>incrementAsync(Counter)}>
                    increment async
                </button>
            </p>
        )
    
}
Counter.propTypes ={
    value:PropTypes.number.isRequired,
    onIncrement:PropTypes.func.isRequired,
    onDecrement:PropTypes.func.isRequired
}
export default connect(null,{onIncrement,onDecrement})(Counter)