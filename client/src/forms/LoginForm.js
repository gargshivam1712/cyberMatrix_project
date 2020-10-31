import React ,{Component,Fragment} from "react";
import Message from "../messages/Message";
import {Link} from "react-router-dom"

import {connect} from "react-redux"

class LoginForm extends Component
{
    state={
        data:{
            email:'',
            password:'',
            checked : false
        },
        loading:true,
        error:{}
    }

    componentDidMount()
    {
        this.setState({
            data : {...this.state.data , username : '' , password : ''}
        })
    }
    // method for change value of input
    onChange=(e)=>{
        this.setState({
            data:{...this.state.data,[e.target.name]:e.target.value}
        })
    }

    // method for change value of check button
    onCheckChange = (e)=>{
        this.setState({
            data : {...this.state.data, [e.target.name] : !this.state.data.checked}
        })
    }

    // method for submit data
    onSubmit=(e)=>
    {
        e.preventDefault()
        const error = this.validate(this.state.data)
        this.setState({ error:error });
        if (Object.keys(error).length===0)
        {   this.setState({loading:true})
            console.log(this.state.data)
            this.props.submit(this.state.data)            
        }
    }

    // method for check error 
    validate = (data)=>{
        const error = {};
        if (!data.email) error.email="Email Must be required"
        if (!data.password) error.password="Password Must be required"
        return error;
    }

    render()
    {
        const {data,error} = this.state;
        return (
            <div className = 'container'>
                <div className = 'row'>
                    <div className = 'col-12 h2'>Log in to your account</div>
                    <div className = 'container py-3' >
                        <div className = 'container'>
                            <div className = 'row'>
                                <div className='form-group col-12'>
                                    <input type='text' name='email' id='email' placeholder='Email*' value={data.email} onChange={this.onChange} className='form-control'/>
                                    <Message message={error.email}/>
                                </div>
                                <div className='form-group col-12'>
                                    <input type='password' name='password' id='password' placeholder='Password*' value={data.password} onChange={this.onChange} className='form-control'/>
                                    <Message message={error.password}/>
                                </div>
                                <div className = 'col-12 '>
                                    <input type = "checkbox" checked = {data.checked} style = {{marginRight : '10px'}} onChange = {this.onCheckChange} name = 'checked' value = {data.checked} />
                                    <label>Check</label>
                                </div>
                                <div className='form-group col-12' onClick = {this.onSubmit}>
                                    <div className = 'text-center text-white h6 p-2' style = {{backgroundColor : '#e91e63e6',borderRadius : '24px'}}>Log In</div>
                                </div>
                                <div className = 'form-group col-12 text-center' style = {{color : '#e91e63e6'}}>
                                    <Link >Forget Password?</Link>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

        )
    }
}


export default connect(null,{})(LoginForm)