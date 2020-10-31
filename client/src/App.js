import React , {Component , Fragment} from 'react';
import {Route , Switch} from "react-router-dom"
import Navbar from "./components/layout/Navbar"
import HomePage from "./pages/HomePage"
import Login from "./pages/Login"
import Register from "./pages/Register"
import PrivateRoute from "./components/commons/PrivateRoute"
import GuestRoute from "./components/commons/GuestRoute"
import {connect} from "react-redux"
import Footer from "./components/layout/Footer"


class App extends Component{
  render()
  {
    return(
      // create layout 
      <Fragment>
        <Navbar/>
        {
          this.props.message && <div className="alert text-center alert-danger shadow alert-dismissible">
            <button type="button" className="close" data-dismiss="alert">&times;</button>{this.props.message}
          </div>
        }
        <Switch>
          <PrivateRoute  exact component = {HomePage} path = '/' />
          <GuestRoute exact path = '/login' component = {Login} />
          <GuestRoute exact path = '/register' component = {Register} />
        </Switch>
        <Footer/>
      </Fragment>
    )
  }
}

const mapStatetoProps = (state)=>({
  message : state.user.message
})

export default connect(mapStatetoProps,{})(App)
