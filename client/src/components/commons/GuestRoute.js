import React from "react"
import {Route,Redirect} from "react-router-dom"
import {connect} from "react-redux"

// this route for unauthenicated user
const GuestRoute=({component:Component,auth,...rest})=>{
    
    return <Route {...rest}
    render = {
        props=>{
           if(auth.authentication){
                return <Redirect to = {
                    {
                        pathname:"/",
                        state:{from:props.location}
                    }
                    
                }
                  />
            }
            else
            return <Component {...props}/>
        }
    }
    />
}

const mapStatetoProps = (state)=>({
    auth: state.user
})

export default connect(mapStatetoProps)(GuestRoute)