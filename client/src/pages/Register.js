import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RegisterForm from '../forms/RegisterForm1'
import { register } from '../redux/actions/auth'
import {connect} from "react-redux"
import { Redirect } from 'react-router-dom'


class Register extends Component {

    submit=(data)=>this.props.register(data).then(()=>this.setState({
        success:true
    }))

    state = {
        success :false,
    }

    render(){
        if(this.state.success){
            return <Redirect to="/login"/>
        }
        return(
            <div className="container bg-white my-5 py-4" style={{width:"500px"}}>
                <RegisterForm submit = {this.submit}/>
            </div>
        )
    }
}

Register.propTypes = {
    register : PropTypes.func.isRequired,
}


export default connect(null,{register})(Register)
