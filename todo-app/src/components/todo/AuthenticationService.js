import axios from 'axios'
import { API_URL } from '../../Constants.js'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

class AuthenticationService {
    
    executeBasicAuthenticationService(username, password){
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                authorization: this.createBasicAuthenticationToken(username, password)
            }
        })
    }

    executeJwtAuthenticationService(username, password){
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    // Basic Auth
    registerSuccessfulLoginForBasicAuth(username, password){
        console.log(`registerSuccessfulLoginForBasicAuth for user ${username}`)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);

        // setup axios for authentication after user is logged in!
        let basicAuthHeader = this.createBasicAuthenticationToken(username, password)
        this.setupAxiosInterceptors(basicAuthHeader)
    }
    createBasicAuthenticationToken(username, password){
        return 'Basic ' + window.btoa(username + ':' + password)
    }

    // JWT
    registerSuccessfulLoginForJwt(username, token){
        console.log(`registerSuccessfulLoginForJwt for user ${username}`)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);

        // setup axios for JWT authentication after user is logged in!
        let jwtAuthHeader = this.createJwtToken(token)
        this.setupAxiosInterceptors(jwtAuthHeader)
    }
    createJwtToken(token){
        return 'Bearer ' + token
    }

    // every request should send authorization header
    setupAxiosInterceptors(authHeader){
        axios.interceptors.request.use(
            (config) => {
                // only if user is logged in
                if (this.isUserLoggedIn()){
                    config.headers.authorization = authHeader
                }
                return config
            }
        )
    }
    
    logout(){
        console.log(`logout for user ${sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)}`)
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return false
        return true
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null)
            return ''
        return user
    }
}
export default new AuthenticationService()