import axios from 'axios'
import swal from '../modules/sweetAlert'
import {AXIOS_ERROR} from '../constants/responsesConstant'

const baseURL = 'https://6284ab5d6b6c317d5ba7737c.endapi.io'

const instance = axios.create({baseURL, timeout: 5000})

//instance.interceptors.request.use(config => config, error => Promise.reject(error))
instance.interceptors.response.use(config => config, async error => {
    console.log(error)
    await axios.post(`${baseURL}/log`, {text: error}).catch(err => swal.toast('error', AXIOS_ERROR))
    swal.toast('error', AXIOS_ERROR)
    return Promise.reject()
})

export default instance