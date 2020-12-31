import axios from 'axios'
import { API_URL } from '../../Constants.js'
// import AuthenticationService from '../../components/todo/AuthenticationService';

class HelloWorldService {
    executeHelloWorldService(){
        console.log("Hello world service executed");
        return axios.get(`${API_URL}/hello-world`);
    }

    executeHelloWorldBeanService(){
        console.log("Hello world bean service executed");
        return axios.get(`${API_URL}/hello-world-bean`);
    }

    executeHelloWorldPathService(name){
        console.log(`Hello world path service executed with name ${name}`);
        
        // AuthenticationService.setupAxiosInterceptors() is already adding the auth header
        // // Basic auth
        // let user = 'user'
        // let password = 'password'
        // let basicAuthHeader = 'Basic ' + window.btoa(user + ':' + password)

        return axios.get(`${API_URL}/hello-world-path/${name}`)
            // {
            //     headers: {
            //         authorization: basicAuthHeader
            //     }
            // }
        // );
    }
}

export default new HelloWorldService()