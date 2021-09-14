import axios from "axios";


export const GROUP_ID = 'GP01';
export const TOKEN_CYBERSOFT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJGcm9udCBFbmQgNjYiLCJIZXRIYW5TdHJpbmciOiIzMC8wMS8yMDIyIiwiSGV0SGFuVGltZSI6IjE2NDM1MDA4MDAwMDAiLCJuYmYiOjE2MTc1NTU2MDAsImV4cCI6MTY0MzY0ODQwMH0.ufODEd--n4Nm91XfL2RnIB9E1_kvZ4Dy1dyDst3wKuE";
export const USER_LOGIN = 'userLogin';
export const ACCESS_TOKEN = 'accessToken';
export const DOMAIN = 'https://movienew.cybersoft.edu.vn';


export const http = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn',
    timeout: 30000,
})

http.interceptors.request.use((config) => {
    config.headers = {
        ...config.headers,
        'TokenCybersoft': TOKEN_CYBERSOFT,
        'Authorization': 'Bearer' + localStorage.getItem(ACCESS_TOKEN)
    }
    return config
}, (errors) => {
    return Promise.reject(errors)
})
