import Axios from "axios"
import { ACCESS_TOKEN, DOMAIN, TOKEN_CYBERSOFT } from '../util/setting';


export class baseService {
    //put json về phía backend
    put = (url,model) => {
        return  Axios({
            url:`${DOMAIN}${url}`,
            method:'PUT',
            data:model,
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            } //JWT
        }) 
    }

    post = (url,model) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'POST',
            data:model,
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN),
                'accept': 'application/json',
            } //JWT
        }) 
    }


    get = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'GET',
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            } //TOKEN yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }

    delete = (url) => {
        return Axios({
            url:`${DOMAIN}${url}`,
            method:'DELETE',
            headers: {
                'TokenCybersoft': TOKEN_CYBERSOFT,
                'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)
            } //token yêu cầu từ backend chứng minh user đã đăng nhập rồi
        })
    }
}