import React, { Component } from 'react'
import {connect} from "react-redux"
import {Link} from "react-router-dom"
import { logout } from "../../redux/actions/auth";

class Navbar extends Component {

    render() {
        return (
            <nav className="navbar navbar-expand-sm bg-white justify-content-around shadow sticky-top">
                <ul className="navbar-nav nav-pills">
                    <li className="nav-item">
                        <Link to = '/' className = "nav-link"><div className = 'px-3 py-2 mx-2 '>HOME</div></Link>
                    </li>
                </ul>
                {this.props.authentication ? 
                <ul className = 'navbar-nav nav-pills'>
                    <li class="nav-item dropdown mx-2">
                        <Link className = 'nav-link dropdown-toggle' id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">USERNAME</Link>
                        <div className ="dropdown-menu">
                            <Link className = 'dropdown-item' to = '/profile'>Profile</Link>
                            <Link className = "dropdown-item" to = '/forget_password'>Forget Password</Link>
                        </div>
                    </li> 
                    <button className = 'btn btn-primary' onClick = {this.props.logout} >LOGOUT</button>                
                </ul>
                : 
                <ul className = 'navbar-nav nav-pills'>
                    <li className="nav-item">
                        <Link to = '/login' className = "nav-link"><div className = ' px-3 py-2 mx-2 '>LOGIN</div></Link>
                    </li>
                    <li className="nav-item">
                        <Link to = '/register' className = "nav-link"><div className = ' px-3 py-2 mx-2 '>REGISTER</div></Link>
                    </li>                
                </ul>
    }
            </nav>
            
        )
    }
}

const mapStatetoProps = state=>({
    authentication : state.user.authentication
})

export default connect(mapStatetoProps,{logout})(Navbar)