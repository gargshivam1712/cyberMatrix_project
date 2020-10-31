import React, { Component } from 'react'
import LoginForm from "../forms/LoginForm"
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
import { login } from '../redux/actions/auth'


class Login extends Component {

    submit = data=>this.props.login(data)
    render() {
        if (this.props.isAuthenticated)
        {
           return <Redirect to="/"/>
        }
        return (
            <div className="container bg-white my-5 py-4" style={{width:"500px"}}>
               
                <LoginForm submit = {this.submit}/>
            </div>
        )
    }
}

const mapStatetoProps = (state)=>({
    isAuthenticated : state.user.authentication
})

Login.propTypes = {
    login : PropTypes.func.isRequired,
    histroy : PropTypes.shape({
        push:PropTypes.func.isRequired
    }),
    isAuthenticated : PropTypes.bool.isRequired
}




export default connect(mapStatetoProps,{login})(Login)