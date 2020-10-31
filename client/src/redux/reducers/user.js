import {LOGIN_FAIL, LOGIN_SUCCESS,LOGOUT,REGISTER_SUCCESS,AUTH_ERROR,USER_LOADDED,REGISTER_FAIL} from "../types/user"

const initialState = {
    token : localStorage.getItem('token'),
    user : null,
    authentication : false,
}

export const userReducer = (state = initialState , action)=>{
    switch(action.type){

        case LOGIN_SUCCESS : 
            localStorage.setItem('token',action.payload.token)
        return {
            ...state,
            token : localStorage.getItem('token'),
        }

        case REGISTER_SUCCESS : 
            return {
                ...state,
                message : "Registeration Successfully"
            }

        case REGISTER_FAIL : 
            console.log(action.payload)
            return {
                ...state,
                message : action.payload.error
            }

        case LOGOUT :
        case LOGIN_FAIL :
        case AUTH_ERROR :
            localStorage.removeItem('token')
            return {
                ...state ,
                token : null,
                user : null,
                authentication : false,
                message : null
            }
        
        case USER_LOADDED : 
            return{
                ...state,
                authentication : true,
                user : action.payload
            }
        
        default :
            return state
    }
}