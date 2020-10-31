import React, { Component,Fragment } from 'react'
import Message from "../messages/Message"
import {Link} from 'react-router-dom'
import {connect} from "react-redux"

class RegisterForm extends Component {
    state={
        data:{
            confirm_password:'',
            password:'',
            email : '',
            username : '',
            terms_condition : false
        },
        loading:true,
        error:{}
    }

    // method for change value of input
    onChange=(e)=>{
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        })
    }

    // methdo for submit data 
    onSubmit=(e)=>
    {
        e.preventDefault()
        const error = this.validate(this.state.data)
        this.setState({ error:error });
        if (Object.keys(error).length===0)
        {   this.setState({loading:true})
            console.log(this.state.data)
            this.props.submit(this.state.data)
            .catch(err=>{
                this.setState({
                    loading : false,
                    error : err.response.data.error
                })
                
                console.log(error+"registeration fail") 
            })            
        }
    }


    // method for check error
    validate = (data)=>{
        const error = {};
        if (!data.password) error.password="Password Must be required"
        if(!data.email) error.email = "Email Must be required"
        if(!data.username) error.username = "UserName Must be required"
        if(!data.confirm_password) {error.confirm_password = "Confirm Password Must be Required"}
        else if(data.password !== data.confirm_password) { error.confirm_password = "Password didn't match"}
        if(data.password && data.email && data.confirm_password )
        {
            if(!data.terms_condition) error.terms_condition = 'Please click on Terms on Service'
        }
        return error;
    }

    render()
    {
               
        const {data,error} = this.state;
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-12 h3'>Create a FREE account</div>
                    <div className ='col-12 text-center'><Message message={error.terms_condition}/></div>
                    
                    <div className='form-group col-12'>
                        <input type='text' name='email' id='email' placeholder='Email*' value={data.email} onChange={this.onChange} className='form-control p-4'/>
                        <Message message={error.email}/>
                    </div>
                    <div className='form-group col-12'>
                        <input type='text' name='username' id='username' placeholder='Username*' value={data.username} onChange={this.onChange} className='form-control p-4'/>
                        <Message message={error.username}/>
                    </div>
                    <div className='form-group col-12'>
                        <input  type='password' name='password' id='password' placeholder='Password*' value={data.password} onChange={this.onChange} className='form-control p-4'/>
                        <Message message={error.password}/>
                    </div>
                    <div className='form-group col-12'>
                        <input type='password' name='confirm_password' id='confirm_password' placeholder='Confirm Password*' value={data.confirm_password} onChange={this.onChange} className='form-control p-4'/>
                        <Message message={error.confirm_password}/>
                    </div>
                    <div className = 'col-12'>
                        <input type = "radio" name = 'terms_condition' value = {true} checked = {this.state.terms_condition} onChange = {this.onChange}  style = {{marginRight : '10px'}} />
                        <label><h5>By signing up, I agree <Link style = {{color : '#e91e63e6'}}>Terms of Service</Link></h5></label>
                    </div>
                    <div className='form-group col-12 submit' onClick = {this.onSubmit}>
                        <div className = 'text-center text-white h6 p-3' style = {{backgroundColor : '#e91e63e6',borderRadius : '24px'}}>Continue</div>
                    </div>
                    <div className = 'col-12 text-center'>
                        <h6>Already have an account? <Link style = {{color : '#e91e63e6'}}>Sign In</Link></h6>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStatetoProps = (state)=>({
    message : state.user.message
  })
  
  export default connect(mapStatetoProps,{})(RegisterForm)