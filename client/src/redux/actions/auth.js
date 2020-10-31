import { LOGIN_SUCCESS , LOGOUT , LOGIN_FAIL ,REGISTER_SUCCESS,USER_LOADDED,AUTH_ERROR,REGISTER_FAIL} from "../types/user";
import axios from "axios"


export const userLoad =()=>(dispatch,getState)=>{

    const token = getState().user.token
    console.log(token)
    const config = {
        'headers':{
            'Content-types':'application/json'
        }
    }
    if(token){
        config.headers['x-access-token']=token
    }

    axios.get('/api/user/profile',config)
    .then((res)=>{
        dispatch({
            type:USER_LOADDED,
            payload:res.data
        })
    })
    .catch(()=>{
        dispatch({
            type:AUTH_ERROR
        })
    })

}


export const login = (data)=>(dispatch)=>
    axios.post('/api/user/login',data)
    .then(res=>{
        dispatch({
            type : LOGIN_SUCCESS , 
            payload : res.data
        })
        dispatch(userLoad())
        return res.data
    })
    .catch(err=>{
        dispatch({
            type : LOGIN_FAIL,
            payload : err.response.data.message
        })
        return err.response.data
    })


export const register = (data)=>(dispatch)=>
    axios.post('/api/user',data)
    .then(res=>{
        dispatch({
            type : REGISTER_SUCCESS , 
            payload : res.data
        })
        return res
    })
    .catch(err=>{
        dispatch({
            type : REGISTER_FAIL ,
            payload : err.response.data
        })
        return err.response.data
    })


export const logout =()=>(dispatch)=>{
    dispatch({
        type : LOGOUT
    })
}